/**
 * Custom Blockly Block Definitions for PyBloc
 * Defines all 26 block types with their shapes, colors, and connections
 */

// ========== BASIC BLOCKS ==========

// Print block
Blockly.Blocks['print'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(null)
        .appendField("print");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#16a085");
    this.setTooltip("Print a value to the console");
    this.setHelpUrl("");
  }
};

// Comment block
Blockly.Blocks['comment'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("# comment:")
        .appendField(new Blockly.FieldTextInput("your comment"), "COMMENT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#5b80a5");
    this.setTooltip("Add a comment to your code");
    this.setHelpUrl("");
  }
};

// Variable assignment block
Blockly.Blocks['variable'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(null)
        .appendField("set")
        .appendField(new Blockly.FieldTextInput("var_name"), "VAR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#5b80a5");
    this.setTooltip("Create or update a variable");
    this.setHelpUrl("");
  }
};

// ========== MATH BLOCKS ==========

// Math operation block (returns value)
Blockly.Blocks['math_op'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["+", "add"],
          ["-", "subtract"],
          ["×", "multiply"],
          ["÷", "divide"],
          ["%", "modulo"],
          ["^", "power"]
        ]), "OP");
    this.appendValueInput("RIGHT")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour("#5ba55b");
    this.setTooltip("Perform a math operation");
    this.setHelpUrl("");
  }
};

// Comparison block (returns boolean)
Blockly.Blocks['comparison'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["=", "equal"],
          ["≠", "not_equal"],
          [">", "greater"],
          ["<", "less"],
          ["≥", "greater_equal"],
          ["≤", "less_equal"]
        ]), "OP");
    this.appendValueInput("RIGHT")
        .setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour("#5ba55b");
    this.setTooltip("Compare two values");
    this.setHelpUrl("");
  }
};

// AND block
Blockly.Blocks['logic_and'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck("Boolean");
    this.appendDummyInput()
        .appendField("and");
    this.appendValueInput("RIGHT")
        .setCheck("Boolean");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour("#5ba55b");
    this.setTooltip("Logical AND operation");
    this.setHelpUrl("");
  }
};

// OR block
Blockly.Blocks['logic_or'] = {
  init: function() {
    this.appendValueInput("LEFT")
        .setCheck("Boolean");
    this.appendDummyInput()
        .appendField("or");
    this.appendValueInput("RIGHT")
        .setCheck("Boolean");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour("#5ba55b");
    this.setTooltip("Logical OR operation");
    this.setHelpUrl("");
  }
};

// NOT block
Blockly.Blocks['logic_not'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("Boolean")
        .appendField("not");
    this.setOutput(true, "Boolean");
    this.setColour("#5ba55b");
    this.setTooltip("Logical NOT operation");
    this.setHelpUrl("");
  }
};

// Random number block
Blockly.Blocks['random_number'] = {
  init: function() {
    this.appendValueInput("MIN")
        .setCheck("Number")
        .appendField("random from");
    this.appendValueInput("MAX")
        .setCheck("Number")
        .appendField("to");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour("#5ba55b");
    this.setTooltip("Generate a random number in range");
    this.setHelpUrl("");
  }
};

// ========== CONTROL FLOW BLOCKS ==========

// If statement
Blockly.Blocks['if'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("if");
    this.appendStatementInput("DO")
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#e08b2c");
    this.setTooltip("Execute code if condition is true");
    this.setHelpUrl("");
  }
};

// If/Else statement
Blockly.Blocks['if_else'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("if");
    this.appendStatementInput("IF_DO")
        .appendField("do");
    this.appendStatementInput("ELSE_DO")
        .appendField("else");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#e08b2c");
    this.setTooltip("Execute code based on condition");
    this.setHelpUrl("");
  }
};

// For loop
Blockly.Blocks['for_loop'] = {
  init: function() {
    this.appendValueInput("TIMES")
        .setCheck("Number")
        .appendField("repeat")
        .appendField(new Blockly.FieldTextInput("i"), "VAR")
        .appendField("from 0 to");
    this.appendStatementInput("DO")
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#e08b2c");
    this.setTooltip("Repeat code a number of times");
    this.setHelpUrl("");
  }
};

// While loop
Blockly.Blocks['while_loop'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("while");
    this.appendStatementInput("DO")
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#e08b2c");
    this.setTooltip("Repeat code while condition is true");
    this.setHelpUrl("");
  }
};

// Break statement
Blockly.Blocks['break'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("break");
    this.setPreviousStatement(true, null);
    this.setColour("#e08b2c");
    this.setTooltip("Exit from a loop");
    this.setHelpUrl("");
  }
};

// Continue statement
Blockly.Blocks['continue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("continue");
    this.setPreviousStatement(true, null);
    this.setColour("#e08b2c");
    this.setTooltip("Skip to next iteration of loop");
    this.setHelpUrl("");
  }
};

// ========== DATA STRUCTURE BLOCKS ==========

// Create list
Blockly.Blocks['create_list'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set")
        .appendField(new Blockly.FieldTextInput("my_list"), "VAR")
        .appendField("to empty list");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#8e44ad");
    this.setTooltip("Create an empty list");
    this.setHelpUrl("");
  }
};

// Add to list
Blockly.Blocks['add_to_list'] = {
  init: function() {
    this.appendValueInput("ITEM")
        .setCheck(null)
        .appendField("add")
    this.appendDummyInput()
        .appendField("to list")
        .appendField(new Blockly.FieldTextInput("my_list"), "LIST");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#8e44ad");
    this.setTooltip("Add an item to a list");
    this.setHelpUrl("");
  }
};

// Get from list
Blockly.Blocks['get_from_list'] = {
  init: function() {
    this.appendValueInput("INDEX")
        .setCheck("Number")
        .appendField("item at index");
    this.appendDummyInput()
        .appendField("from list")
        .appendField(new Blockly.FieldTextInput("my_list"), "LIST");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour("#8e44ad");
    this.setTooltip("Get item from list at index");
    this.setHelpUrl("");
  }
};

// List length
Blockly.Blocks['list_length'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("length of list")
        .appendField(new Blockly.FieldTextInput("my_list"), "LIST");
    this.setOutput(true, "Number");
    this.setColour("#8e44ad");
    this.setTooltip("Get the length of a list");
    this.setHelpUrl("");
  }
};

// Create dictionary
Blockly.Blocks['create_dict'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set")
        .appendField(new Blockly.FieldTextInput("my_dict"), "VAR")
        .appendField("to empty dictionary");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#8e44ad");
    this.setTooltip("Create an empty dictionary");
    this.setHelpUrl("");
  }
};

// Set dictionary item
Blockly.Blocks['set_dict_item'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(null)
        .appendField("in dict")
        .appendField(new Blockly.FieldTextInput("my_dict"), "DICT")
        .appendField("set key")
        .appendField(new Blockly.FieldTextInput("key"), "KEY")
        .appendField("to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#8e44ad");
    this.setTooltip("Set a value in dictionary");
    this.setHelpUrl("");
  }
};

// Get dictionary item
Blockly.Blocks['get_dict_item'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("in dict")
        .appendField(new Blockly.FieldTextInput("my_dict"), "DICT")
        .appendField("get value at key")
        .appendField(new Blockly.FieldTextInput("key"), "KEY");
    this.setOutput(true, null);
    this.setColour("#8e44ad");
    this.setTooltip("Get value from dictionary");
    this.setHelpUrl("");
  }
};

// ========== INPUT/OUTPUT BLOCKS ==========

// Get input
Blockly.Blocks['get_input'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ask")
        .appendField(new Blockly.FieldTextInput("Enter value:"), "PROMPT")
        .appendField("and store in")
        .appendField(new Blockly.FieldTextInput("user_input"), "VAR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#16a085");
    this.setTooltip("Get input from user");
    this.setHelpUrl("");
  }
};

// Print formatted (f-string)
Blockly.Blocks['print_formatted'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("print formatted")
        .appendField(new Blockly.FieldTextInput("Value: {x}"), "TEXT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#16a085");
    this.setTooltip("Print with variable interpolation");
    this.setHelpUrl("");
  }
};

// ========== ADVANCED BLOCKS ==========

// Define function
Blockly.Blocks['define_function'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("def")
        .appendField(new Blockly.FieldTextInput("my_function"), "NAME")
        .appendField("(")
        .appendField(new Blockly.FieldTextInput(""), "PARAMS")
        .appendField("):");
    this.appendStatementInput("DO")
        .appendField("");
    this.setColour("#c0392b");
    this.setTooltip("Define a function");
    this.setHelpUrl("");
  }
};

// Call function
Blockly.Blocks['call_function'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("call")
        .appendField(new Blockly.FieldTextInput("my_function"), "NAME")
        .appendField("(")
        .appendField(new Blockly.FieldTextInput(""), "ARGS")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#c0392b");
    this.setTooltip("Call a function");
    this.setHelpUrl("");
  }
};

// Try/Except
Blockly.Blocks['try_except'] = {
  init: function() {
    this.appendStatementInput("TRY")
        .appendField("try");
    this.appendStatementInput("EXCEPT")
        .appendField("except");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#c0392b");
    this.setTooltip("Handle errors with try/except");
    this.setHelpUrl("");
  }
};

// Sleep/Wait
Blockly.Blocks['wait'] = {
  init: function() {
    this.appendValueInput("SECONDS")
        .setCheck("Number")
        .appendField("wait");
    this.appendDummyInput()
        .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#c0392b");
    this.setTooltip("Pause execution for specified seconds");
    this.setHelpUrl("");
  }
};

// ========== VALUE BLOCKS (for expressions) ==========

// Number block
Blockly.Blocks['number'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "NUM");
    this.setOutput(true, "Number");
    this.setColour("#5ba55b");
    this.setTooltip("A number value");
    this.setHelpUrl("");
  }
};

// Text/String block
Blockly.Blocks['text'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(""), "TEXT");
    this.setOutput(true, "String");
    this.setColour("#5ba55b");
    this.setTooltip("A text value");
    this.setHelpUrl("");
  }
};

// Boolean block
Blockly.Blocks['boolean'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["True", "True"],
          ["False", "False"]
        ]), "BOOL");
    this.setOutput(true, "Boolean");
    this.setColour("#5ba55b");
    this.setTooltip("A boolean value");
    this.setHelpUrl("");
  }
};

// Variable reference block
Blockly.Blocks['variable_ref'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("var_name"), "VAR");
    this.setOutput(true, null);
    this.setColour("#5b80a5");
    this.setTooltip("Reference a variable");
    this.setHelpUrl("");
  }
};
