# pybloc
PyBloc is a visual block-based coding website where you can learn Python in the easiest way possible! It's similar to Scratch and EduBlocks, making programming accessible and fun.

## Features

### 📝 Comprehensive Block Library
- **Basic Blocks**: Print, Comment, Variable Assignment
- **Math & Logic**: Operations (+, -, ×, ÷, %, ^), Comparisons, Logical operators (AND, OR, NOT), Random numbers
- **Control Flow**: If/Else statements, For loops, While loops, Break/Continue
- **Data Structures**: Lists and Dictionaries with full CRUD operations
- **Input/Output**: User input and formatted printing
- **Advanced**: Function definitions, Try/Except error handling, Wait/Sleep

### 🎨 User-Friendly Interface
- Drag-and-drop block programming
- Color-coded block categories
- Collapsible block palette
- Real-time Python code generation
- Live output display
- Copy generated code to clipboard

## Quick Start

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nathangosselin339-web/pybloc.git
cd pybloc
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python app.py
```

4. Open your browser and navigate to:
```
http://localhost:5000
```

### Development Mode

To enable Flask debug mode for development:
```bash
export FLASK_DEBUG=true  # Linux/Mac
set FLASK_DEBUG=true     # Windows
python app.py
```

## How to Use

1. **Select Blocks**: Browse the block palette on the left side
2. **Drag Blocks**: Drag blocks into the workspace area
3. **Configure**: Fill in the input fields on each block
4. **Run Code**: Click the "▶ Run Code" button to execute
5. **View Output**: See results in the Output panel on the right
6. **Copy Code**: Use the Copy button to get the generated Python code

## Example Programs

### Hello World
1. Drag a "Print" block to the workspace
2. Type "Hello, World!" in the message field
3. Click Run Code

### For Loop with Random Numbers
1. Create a list: `numbers = []`
2. Add a for loop (i in range(5))
3. Inside loop: generate random number
4. Inside loop: add number to list
5. Print the list

### Function Example
1. Define function with parameters
2. Add function body blocks
3. Call the function with arguments

## Technology Stack

- **Backend**: Flask (Python 3)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with responsive design

## Security Notes

The application uses `exec()` with a restricted global namespace for educational purposes. For production deployment, consider:
- Using RestrictedPython for better sandboxing
- Adding resource limits (CPU, memory, execution time)
- Implementing AST validation
- Running code in isolated containers

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is open source and available under the MIT License.

## Acknowledgments

Inspired by Scratch and EduBlocks, making Python programming visual and accessible to everyone!

