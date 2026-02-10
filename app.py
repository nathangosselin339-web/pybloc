from flask import Flask, render_template, request, jsonify
import sys
from io import StringIO
import traceback

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/execute', methods=['POST'])
def execute_code():
    """
    Execute Python code generated from block structure.
    
    Security Note: This uses exec() with a restricted global namespace.
    For production use, consider:
    - Using RestrictedPython for better sandboxing
    - Adding resource limits (CPU, memory, execution time)
    - Implementing AST validation before execution
    - Running code in isolated containers or processes
    """
    try:
        blocks = request.json.get('blocks', [])
        code = generate_code(blocks)
        
        # Capture output
        old_stdout = sys.stdout
        sys.stdout = StringIO()
        
        # Create execution context with limited globals
        import random
        import time
        
        exec_globals = {
            '__builtins__': {
                'print': print,
                'len': len,
                'range': range,
                'int': int,
                'float': float,
                'str': str,
                'bool': bool,
                'list': list,
                'dict': dict,
                'abs': abs,
                'min': min,
                'max': max,
                'sum': sum,
                'round': round,
            },
            'random': random,
            'time': time,
            'input': lambda prompt='': prompt  # Mock input for web environment
        }
        
        exec(code, exec_globals)
        
        output = sys.stdout.getvalue()
        sys.stdout = old_stdout
        
        return jsonify({
            'success': True,
            'output': output,
            'code': code
        })
    except Exception as e:
        sys.stdout = old_stdout
        return jsonify({
            'success': False,
            'error': str(e),
            'traceback': traceback.format_exc(),
            'code': code if 'code' in locals() else ''
        })

def generate_code(blocks, indent_level=0):
    """Generate Python code from block structure"""
    code_lines = []
    indent = '    ' * indent_level
    
    for block in blocks:
        block_type = block.get('type', '')
        
        # Basic blocks
        if block_type == 'print':
            value = block.get('value', '')
            code_lines.append(f"{indent}print({repr(value)})")
            
        elif block_type == 'comment':
            comment = block.get('comment', '')
            code_lines.append(f"{indent}# {comment}")
            
        # Math operations
        elif block_type == 'math_op':
            op = block.get('operation', 'add')
            left = block.get('left', '0')
            right = block.get('right', '0')
            var_name = block.get('variable', 'result')
            
            op_map = {
                'add': '+',
                'subtract': '-',
                'multiply': '*',
                'divide': '/',
                'modulo': '%',
                'power': '**'
            }
            operator = op_map.get(op, '+')
            code_lines.append(f"{indent}{var_name} = {left} {operator} {right}")
            
        # Comparison operations
        elif block_type == 'comparison':
            op = block.get('operation', 'equal')
            left = block.get('left', '0')
            right = block.get('right', '0')
            var_name = block.get('variable', 'result')
            
            op_map = {
                'equal': '==',
                'not_equal': '!=',
                'greater': '>',
                'less': '<',
                'greater_equal': '>=',
                'less_equal': '<='
            }
            operator = op_map.get(op, '==')
            code_lines.append(f"{indent}{var_name} = {left} {operator} {right}")
            
        # Logical operations
        elif block_type == 'logical_op':
            op = block.get('operation', 'and')
            left = block.get('left', 'True')
            right = block.get('right', 'True')
            var_name = block.get('variable', 'result')
            
            if op == 'not':
                code_lines.append(f"{indent}{var_name} = not {left}")
            else:
                operator = 'and' if op == 'and' else 'or'
                code_lines.append(f"{indent}{var_name} = {left} {operator} {right}")
                
        # Random number
        elif block_type == 'random_number':
            min_val = block.get('min', '0')
            max_val = block.get('max', '10')
            var_name = block.get('variable', 'random_num')
            code_lines.append(f"{indent}{var_name} = random.randint({min_val}, {max_val})")
            
        # Control flow - If statement
        elif block_type == 'if':
            condition = block.get('condition', 'True')
            code_lines.append(f"{indent}if {condition}:")
            nested_blocks = block.get('blocks', [])
            if nested_blocks:
                nested_code = generate_code(nested_blocks, indent_level + 1)
                code_lines.append(nested_code)
            else:
                code_lines.append(f"{indent}    pass")
                
        # If/Else statement
        elif block_type == 'if_else':
            condition = block.get('condition', 'True')
            code_lines.append(f"{indent}if {condition}:")
            if_blocks = block.get('if_blocks', [])
            if if_blocks:
                code_lines.append(generate_code(if_blocks, indent_level + 1))
            else:
                code_lines.append(f"{indent}    pass")
            code_lines.append(f"{indent}else:")
            else_blocks = block.get('else_blocks', [])
            if else_blocks:
                code_lines.append(generate_code(else_blocks, indent_level + 1))
            else:
                code_lines.append(f"{indent}    pass")
                
        # For loop
        elif block_type == 'for_loop':
            var = block.get('variable', 'i')
            times = block.get('times', '10')
            code_lines.append(f"{indent}for {var} in range({times}):")
            nested_blocks = block.get('blocks', [])
            if nested_blocks:
                code_lines.append(generate_code(nested_blocks, indent_level + 1))
            else:
                code_lines.append(f"{indent}    pass")
                
        # While loop
        elif block_type == 'while_loop':
            condition = block.get('condition', 'True')
            code_lines.append(f"{indent}while {condition}:")
            nested_blocks = block.get('blocks', [])
            if nested_blocks:
                code_lines.append(generate_code(nested_blocks, indent_level + 1))
            else:
                code_lines.append(f"{indent}    pass")
                
        # Break
        elif block_type == 'break':
            code_lines.append(f"{indent}break")
            
        # Continue
        elif block_type == 'continue':
            code_lines.append(f"{indent}continue")
            
        # Variable assignment
        elif block_type == 'variable':
            var_name = block.get('name', 'var')
            value = block.get('value', '0')
            code_lines.append(f"{indent}{var_name} = {value}")
            
        # List operations
        elif block_type == 'create_list':
            var_name = block.get('variable', 'my_list')
            items = block.get('items', '')
            if items:
                code_lines.append(f"{indent}{var_name} = [{items}]")
            else:
                code_lines.append(f"{indent}{var_name} = []")
                
        elif block_type == 'add_to_list':
            list_name = block.get('list', 'my_list')
            item = block.get('item', '0')
            code_lines.append(f"{indent}{list_name}.append({item})")
            
        elif block_type == 'get_from_list':
            list_name = block.get('list', 'my_list')
            index = block.get('index', '0')
            var_name = block.get('variable', 'item')
            code_lines.append(f"{indent}{var_name} = {list_name}[{index}]")
            
        elif block_type == 'list_length':
            list_name = block.get('list', 'my_list')
            var_name = block.get('variable', 'length')
            code_lines.append(f"{indent}{var_name} = len({list_name})")
            
        # Dictionary operations
        elif block_type == 'create_dict':
            var_name = block.get('variable', 'my_dict')
            code_lines.append(f"{indent}{var_name} = {{}}")
            
        elif block_type == 'set_dict_item':
            dict_name = block.get('dict', 'my_dict')
            key = block.get('key', 'key')
            value = block.get('value', '0')
            code_lines.append(f"{indent}{dict_name}[{repr(key)}] = {value}")
            
        elif block_type == 'get_dict_item':
            dict_name = block.get('dict', 'my_dict')
            key = block.get('key', 'key')
            var_name = block.get('variable', 'value')
            code_lines.append(f"{indent}{var_name} = {dict_name}[{repr(key)}]")
            
        # I/O operations
        elif block_type == 'get_input':
            prompt = block.get('prompt', 'Enter value:')
            var_name = block.get('variable', 'user_input')
            code_lines.append(f"{indent}{var_name} = input({repr(prompt)})")
            
        elif block_type == 'print_formatted':
            text = block.get('text', '')
            code_lines.append(f"{indent}print(f{repr(text)})")
            
        # Function definition
        elif block_type == 'define_function':
            func_name = block.get('name', 'my_function')
            params = block.get('parameters', '')
            code_lines.append(f"{indent}def {func_name}({params}):")
            nested_blocks = block.get('blocks', [])
            if nested_blocks:
                code_lines.append(generate_code(nested_blocks, indent_level + 1))
            else:
                code_lines.append(f"{indent}    pass")
                
        # Function call
        elif block_type == 'call_function':
            func_name = block.get('name', 'my_function')
            args = block.get('arguments', '')
            code_lines.append(f"{indent}{func_name}({args})")
            
        # Wait/Sleep
        elif block_type == 'wait':
            seconds = block.get('seconds', '1')
            code_lines.append(f"{indent}time.sleep({seconds})")
            
        # Try/Except
        elif block_type == 'try_except':
            code_lines.append(f"{indent}try:")
            try_blocks = block.get('try_blocks', [])
            if try_blocks:
                code_lines.append(generate_code(try_blocks, indent_level + 1))
            else:
                code_lines.append(f"{indent}    pass")
            code_lines.append(f"{indent}except Exception as e:")
            except_blocks = block.get('except_blocks', [])
            if except_blocks:
                code_lines.append(generate_code(except_blocks, indent_level + 1))
            else:
                code_lines.append(f"{indent}    print(f'Error: {{e}}')")
    
    return '\n'.join(code_lines)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
