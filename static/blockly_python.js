/**
 * Python Code Generators for PyBloc Blockly Blocks
 * Generates Python code from custom blocks
 * Using Blockly v10+ API with forBlock
 */

// ========== BASIC BLOCKS ==========

Blockly.Python.forBlock['print'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || '""';
  return 'print(' + value + ')\n';
};

Blockly.Python.forBlock['comment'] = function(block, generator) {
  var comment = block.getFieldValue('COMMENT');
  return '# ' + comment + '\n';
};

Blockly.Python.forBlock['variable'] = function(block, generator) {
  var varName = block.getFieldValue('VAR');
  var value = generator.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || '0';
  return varName + ' = ' + value + '\n';
};

// ========== MATH BLOCKS ==========

Blockly.Python.forBlock['math_op'] = function(block, generator) {
  var operator = block.getFieldValue('OP');
  var left = generator.valueToCode(block, 'LEFT', Blockly.Python.ORDER_ATOMIC) || '0';
  var right = generator.valueToCode(block, 'RIGHT', Blockly.Python.ORDER_ATOMIC) || '0';
  
  var opMap = {
    'add': '+',
    'subtract': '-',
    'multiply': '*',
    'divide': '/',
    'modulo': '%',
    'power': '**'
  };
  
  var op = opMap[operator] || '+';
  var code = left + ' ' + op + ' ' + right;
  return [code, Blockly.Python.ORDER_ADDITIVE];
};

Blockly.Python.forBlock['comparison'] = function(block, generator) {
  var operator = block.getFieldValue('OP');
  var left = generator.valueToCode(block, 'LEFT', Blockly.Python.ORDER_RELATIONAL) || '0';
  var right = generator.valueToCode(block, 'RIGHT', Blockly.Python.ORDER_RELATIONAL) || '0';
  
  var opMap = {
    'equal': '==',
    'not_equal': '!=',
    'greater': '>',
    'less': '<',
    'greater_equal': '>=',
    'less_equal': '<='
  };
  
  var op = opMap[operator] || '==';
  var code = left + ' ' + op + ' ' + right;
  return [code, Blockly.Python.ORDER_RELATIONAL];
};

Blockly.Python.forBlock['logic_and'] = function(block, generator) {
  var left = generator.valueToCode(block, 'LEFT', Blockly.Python.ORDER_LOGICAL_AND) || 'True';
  var right = generator.valueToCode(block, 'RIGHT', Blockly.Python.ORDER_LOGICAL_AND) || 'True';
  var code = left + ' and ' + right;
  return [code, Blockly.Python.ORDER_LOGICAL_AND];
};

Blockly.Python.forBlock['logic_or'] = function(block, generator) {
  var left = generator.valueToCode(block, 'LEFT', Blockly.Python.ORDER_LOGICAL_OR) || 'False';
  var right = generator.valueToCode(block, 'RIGHT', Blockly.Python.ORDER_LOGICAL_OR) || 'False';
  var code = left + ' or ' + right;
  return [code, Blockly.Python.ORDER_LOGICAL_OR];
};

Blockly.Python.forBlock['logic_not'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', Blockly.Python.ORDER_LOGICAL_NOT) || 'True';
  var code = 'not ' + value;
  return [code, Blockly.Python.ORDER_LOGICAL_NOT];
};

Blockly.Python.forBlock['random_number'] = function(block, generator) {
  var min = generator.valueToCode(block, 'MIN', Blockly.Python.ORDER_NONE) || '0';
  var max = generator.valueToCode(block, 'MAX', Blockly.Python.ORDER_NONE) || '10';
  var code = 'random.randint(' + min + ', ' + max + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// ========== CONTROL FLOW BLOCKS ==========

Blockly.Python.forBlock['if'] = function(block, generator) {
  var condition = generator.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_NONE) || 'True';
  var branch = generator.statementToCode(block, 'DO');
  
  if (!branch) {
    branch = generator.PASS;
  }
  
  return 'if ' + condition + ':\n' + branch;
};

Blockly.Python.forBlock['if_else'] = function(block, generator) {
  var condition = generator.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_NONE) || 'True';
  var ifBranch = generator.statementToCode(block, 'IF_DO');
  var elseBranch = generator.statementToCode(block, 'ELSE_DO');
  
  if (!ifBranch) {
    ifBranch = generator.PASS;
  }
  if (!elseBranch) {
    elseBranch = generator.PASS;
  }
  
  return 'if ' + condition + ':\n' + ifBranch + 'else:\n' + elseBranch;
};

Blockly.Python.forBlock['for_loop'] = function(block, generator) {
  var variable = block.getFieldValue('VAR');
  var times = generator.valueToCode(block, 'TIMES', Blockly.Python.ORDER_NONE) || '10';
  var branch = generator.statementToCode(block, 'DO');
  
  if (!branch) {
    branch = generator.PASS;
  }
  
  return 'for ' + variable + ' in range(' + times + '):\n' + branch;
};

Blockly.Python.forBlock['while_loop'] = function(block, generator) {
  var condition = generator.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_NONE) || 'True';
  var branch = generator.statementToCode(block, 'DO');
  
  if (!branch) {
    branch = generator.PASS;
  }
  
  return 'while ' + condition + ':\n' + branch;
};

Blockly.Python.forBlock['break'] = function(block, generator) {
  return 'break\n';
};

Blockly.Python.forBlock['continue'] = function(block, generator) {
  return 'continue\n';
};

// ========== DATA STRUCTURE BLOCKS ==========

Blockly.Python.forBlock['create_list'] = function(block, generator) {
  var varName = block.getFieldValue('VAR');
  return varName + ' = []\n';
};

Blockly.Python.forBlock['add_to_list'] = function(block, generator) {
  var listName = block.getFieldValue('LIST');
  var item = generator.valueToCode(block, 'ITEM', Blockly.Python.ORDER_NONE) || '0';
  return listName + '.append(' + item + ')\n';
};

Blockly.Python.forBlock['get_from_list'] = function(block, generator) {
  var listName = block.getFieldValue('LIST');
  var index = generator.valueToCode(block, 'INDEX', Blockly.Python.ORDER_NONE) || '0';
  var code = listName + '[' + index + ']';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.forBlock['list_length'] = function(block, generator) {
  var listName = block.getFieldValue('LIST');
  var code = 'len(' + listName + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.forBlock['create_dict'] = function(block, generator) {
  var varName = block.getFieldValue('VAR');
  return varName + ' = {}\n';
};

Blockly.Python.forBlock['set_dict_item'] = function(block, generator) {
  var dictName = block.getFieldValue('DICT');
  var key = block.getFieldValue('KEY');
  var value = generator.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || '0';
  return dictName + '[' + generator.quote_(key) + '] = ' + value + '\n';
};

Blockly.Python.forBlock['get_dict_item'] = function(block, generator) {
  var dictName = block.getFieldValue('DICT');
  var key = block.getFieldValue('KEY');
  var code = dictName + '[' + generator.quote_(key) + ']';
  return [code, Blockly.Python.ORDER_MEMBER];
};

// ========== INPUT/OUTPUT BLOCKS ==========

Blockly.Python.forBlock['get_input'] = function(block, generator) {
  var prompt = block.getFieldValue('PROMPT');
  var varName = block.getFieldValue('VAR');
  return varName + ' = input(' + generator.quote_(prompt) + ')\n';
};

Blockly.Python.forBlock['print_formatted'] = function(block, generator) {
  var text = block.getFieldValue('TEXT');
  return 'print(f' + generator.quote_(text) + ')\n';
};

// ========== ADVANCED BLOCKS ==========

Blockly.Python.forBlock['define_function'] = function(block, generator) {
  var funcName = block.getFieldValue('NAME');
  var params = block.getFieldValue('PARAMS');
  var branch = generator.statementToCode(block, 'DO');
  
  if (!branch) {
    branch = generator.PASS;
  }
  
  return 'def ' + funcName + '(' + params + '):\n' + branch + '\n';
};

Blockly.Python.forBlock['call_function'] = function(block, generator) {
  var funcName = block.getFieldValue('NAME');
  var args = block.getFieldValue('ARGS');
  return funcName + '(' + args + ')\n';
};

Blockly.Python.forBlock['try_except'] = function(block, generator) {
  var tryBranch = generator.statementToCode(block, 'TRY');
  var exceptBranch = generator.statementToCode(block, 'EXCEPT');
  
  if (!tryBranch) {
    tryBranch = generator.PASS;
  }
  if (!exceptBranch) {
    exceptBranch = generator.INDENT + 'print(f\'Error: {e}\')\n';
  }
  
  return 'try:\n' + tryBranch + 'except Exception as e:\n' + exceptBranch;
};

Blockly.Python.forBlock['wait'] = function(block, generator) {
  var seconds = generator.valueToCode(block, 'SECONDS', Blockly.Python.ORDER_NONE) || '1';
  return 'time.sleep(' + seconds + ')\n';
};

// ========== VALUE BLOCKS ==========

Blockly.Python.forBlock['number'] = function(block, generator) {
  var num = block.getFieldValue('NUM');
  return [String(num), Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['text'] = function(block, generator) {
  var text = block.getFieldValue('TEXT');
  return [generator.quote_(text), Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['boolean'] = function(block, generator) {
  var bool = block.getFieldValue('BOOL');
  return [bool, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.forBlock['variable_ref'] = function(block, generator) {
  var varName = block.getFieldValue('VAR');
  return [varName, Blockly.Python.ORDER_ATOMIC];
};
