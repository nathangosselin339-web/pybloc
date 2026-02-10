#!/usr/bin/env python3
"""
Simple test script to verify PyBloc installation and functionality.
Run this after installing dependencies to ensure everything works.
"""

import sys
import json

def test_flask_import():
    """Test that Flask is installed"""
    try:
        import flask
        print("✓ Flask installed successfully")
        return True
    except ImportError:
        print("✗ Flask not found. Run: pip install -r requirements.txt")
        return False

def test_code_generation():
    """Test the code generation logic"""
    try:
        from app import generate_code
        
        # Test basic blocks
        blocks = [
            {'type': 'print', 'value': 'Hello'},
            {'type': 'variable', 'name': 'x', 'value': '10'},
            {'type': 'math_op', 'variable': 'result', 'left': 'x', 'operation': 'add', 'right': '5'},
        ]
        
        code = generate_code(blocks)
        
        # Verify code contains expected statements
        assert "print('Hello')" in code
        assert "x = 10" in code
        assert "result = x + 5" in code
        
        print("✓ Code generation working correctly")
        return True
    except Exception as e:
        print(f"✗ Code generation test failed: {e}")
        return False

def test_all_block_types():
    """Test that all block types can generate code"""
    from app import generate_code
    
    block_types = [
        'print', 'comment', 'variable', 'math_op', 'comparison', 
        'logical_op', 'random_number', 'if', 'if_else', 'for_loop',
        'while_loop', 'break', 'continue', 'create_list', 'add_to_list',
        'get_from_list', 'list_length', 'create_dict', 'set_dict_item',
        'get_dict_item', 'get_input', 'print_formatted', 'define_function',
        'call_function', 'wait', 'try_except'
    ]
    
    try:
        for block_type in block_types:
            blocks = [{'type': block_type}]
            code = generate_code(blocks)
            assert code, f"Block type '{block_type}' produced no code"
        
        print(f"✓ All {len(block_types)} block types generate code")
        return True
    except Exception as e:
        print(f"✗ Block type test failed: {e}")
        return False

def main():
    """Run all tests"""
    print("PyBloc Installation Test")
    print("=" * 40)
    
    tests = [
        test_flask_import,
        test_code_generation,
        test_all_block_types,
    ]
    
    results = []
    for test in tests:
        results.append(test())
        print()
    
    print("=" * 40)
    if all(results):
        print("✓ All tests passed! PyBloc is ready to use.")
        print("Run 'python app.py' to start the application.")
        return 0
    else:
        print("✗ Some tests failed. Please check the errors above.")
        return 1

if __name__ == '__main__':
    sys.exit(main())
