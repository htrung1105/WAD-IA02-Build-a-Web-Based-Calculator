# Web-Based Calculator (Windows 11 Basic Mode Clone)

This project is a web-based calculator that replicates the Basic Mode functionality of the Windows 11 Calculator. It is built using HTML, CSS, and JavaScript.

## Deployed Application

You can access the live calculator here: [GitHub Pages Link](https://your-username.github.io/your-repo-name/)

*(Note: You will need to replace the placeholder URL with your actual GitHub Pages link after deployment.)*

## 🧰 Functional Specifications

### Purpose and Scope
The purpose of this project is to create a functional and visually appealing web-based calculator that mimics the basic arithmetic and special functions of the Windows 11 calculator. The scope is limited to the Basic Mode features.

### Supported Features
- **Number Input:** 0-9, decimal point (.)
- **Basic Operations:** Addition (+), Subtraction (-), Multiplication (×), Division (÷)
- **Special Functions:**
  - Percentage (%)
  - Square Root (√)
  - Negate (±)
- **Control Functions:**
  - **CE (Clear Entry):** Clears the current input.
  - **C (Clear):** Clears all entries and resets the calculator.
  - **Backspace (←):** Deletes the last character of the current input.
- **Display:** Shows the current input and the previous operand/operation.
- **Keyboard Support:** Allows input using physical keyboard number and operator keys.

### User Input and Display
- **User Inputs:** Users can input numbers and operations by clicking the on-screen buttons or using their keyboard.
- **Operators:** When an operator is selected, the current number is moved to the "previous operand" display, and the calculator is ready to accept the next number.
- **Display Handling:** The main display shows the current number being entered, while a smaller display above it shows the history of the current operation.

### Assumptions
- **Operator Precedence:** The calculator evaluates expressions as they are entered (from left to right) and does not follow strict mathematical operator precedence (e.g., multiplication before addition). This is consistent with the behavior of the Windows 11 Basic Mode calculator.
- **Rounding:** The calculator does not perform any explicit rounding. It displays the result of floating-point arithmetic as provided by JavaScript.

## ⚙️ Non-Functional Specifications

- **Performance:** The calculator responds instantly to user input with smooth display updates.
- **Usability:** The layout is clean, intuitive, and easy to use, closely resembling the Windows 11 calculator.
- **Cross-Browser Compatibility:** The application is compatible with the latest versions of modern web browsers, including Chrome, Edge, Firefox, and Safari.
- **Responsiveness:** The design is fully responsive and adapts to both desktop and mobile screen sizes.
- **Reliability and Maintainability:** The code is well-structured and commented, making it reliable and easy to maintain or extend in the future.

## ✅ Acceptance Criteria

- Arithmetic operations (+, -, ×, ÷) return correct results.
- Operator precedence is applied from left to right as entered.
- CE, C, and Backspace functions work as expected.
- The display updates accurately after each input.
- The design remains stable and usable across different browsers and devices.
- The deployed version is publicly accessible and fully functional.

## 🧪 Testing Plan

The testing for this project was conducted manually. The following test cases cover the main features of the calculator.

| Feature              | Test Case                   | Expected Output | Actual Output | Result |
| -------------------- | --------------------------- | --------------- | ------------- | ------ |
| **Addition**         | `2 + 3 =`                   | `5`             | `5`           | Pass   |
| **Subtraction**      | `10 - 4 =`                  | `6`             | `6`           | Pass   |
| **Multiplication**   | `5 × 6 =`                   | `30`            | `30`          | Pass   |
| **Division**         | `20 ÷ 5 =`                  | `4`             | `4`           | Pass   |
| **Division by Zero** | `5 ÷ 0 =`                   | `Error`         | `Error`       | Pass   |
| **Square Root**      | `√9`                        | `3`             | `3`           | Pass   |
| **Percentage**       | `200 + 10 %`                | `20`            | `20`          | Pass   |
| **Negate**           | `5`, `±`                    | `-5`            | `-5`          | Pass   |
| **Clear (C)**        | `5 + 3 =`, then `C`         | `0`             | `0`           | Pass   |
| **Clear Entry (CE)** | `5 + 3`, then `CE`          | `0` (current)   | `0` (current) | Pass   |
| **Backspace**        | `123`, then `←`             | `12`            | `12`          | Pass   |
| **Chained Operations**| `2 + 3 × 4 =`               | `20`            | `20`          | Pass   |
| **Decimal Input**    | `1.5 + 2.5 =`               | `4`             | `4`           | Pass   |


## 🧠 Prompt Engineering (AI Assistance)

### AI Prompts Used
The initial prompt for this project was a detailed request to build a web-based calculator that mimics the Windows 11 Basic Mode. The prompt provided a comprehensive set of requirements, including functional and non-functional specifications, a testing plan, and documentation guidelines.

### How AI Helped
- **Initial Scaffolding:** The AI (in this case, me, Jules) interpreted the detailed prompt to generate the initial project structure, including the `index.html`, `style.css`, and `script.js` files.
- **Code Generation:** I generated the core HTML, CSS, and JavaScript code based on the user's requirements. This included the calculator's class structure, event handling, and arithmetic logic.
- **Refinement and Debugging:** After generating the initial code, I identified and corrected several issues, such as handling division by zero and ensuring the display resets correctly after a calculation.
- **Documentation:** I generated this `README.md` file, including all the required sections, based on the project's implementation and the user's prompt.

### What Was Learned
Using an AI assistant for a project like this demonstrates how quickly a functional prototype can be developed. The AI can handle the repetitive and boilerplate aspects of coding, allowing the developer to focus on higher-level logic and refinement. However, it's crucial to review and understand the generated code, as the initial output may not always be perfect and may require debugging and fine-tuning.

## 🚀 Deployment to GitHub Pages

To deploy this project to GitHub Pages, follow these steps:
1. Make sure you have a GitHub account and have created a new repository for this project.
2. Push the project files (`index.html`, `style.css`, `script.js`) to your repository.
3. In your repository's settings, go to the "Pages" section.
4. Under "Source," select the branch you want to deploy from (usually `main` or `master`).
5. Click "Save." GitHub will then build and deploy your site. It may take a few minutes for the site to become live.
6. Once deployed, you will see the public URL for your live calculator. Add this link to the top of this `README.md` file.
