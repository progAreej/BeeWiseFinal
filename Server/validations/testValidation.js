const { userSchema } = require('./userValidation'); // Adjust the path as necessary

// Sample test data
const testData = [
  {
    input: {
      username: 'JohnDoe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      role: 'customer',
    },
    expected: null, // No validation errors expected
  },
  {
    input: {
      username: 'JD',
      email: 'john@example.com',
      password: '123',
      confirmPassword: '123',
      role: 'customer',
    },
    expected: '"username" length must be at least 3 characters long', // Update expected message
  },
  {
    input: {
      username: 'JohnDoe',
      email: 'not-an-email',
      password: 'password123',
      confirmPassword: 'password123',
      role: 'customer',
    },
    expected: '"email" must be a valid email',
  },
  {
    input: {
      username: 'JohnDoe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'differentPassword',
      role: 'customer',
    },
    expected: 'Passwords do not match.',
  },
];

testData.forEach(({ input, expected }, index) => {
  const { error } = userSchema.validate(input);
  if (error) {
    console.log(`Test ${index + 1}: ${error.details[0].message}`);
    if (error.details[0].message === expected) {
      console.log('Test passed.\n');
    } else {
      console.log(`Test failed: expected "${expected}", but got "${error.details[0].message}".\n`);
    }
  } else {
    if (expected === null) {
      console.log(`Test ${index + 1}: Passed. No validation errors.\n`);
    } else {
      console.log(`Test failed: expected error "${expected}", but got no errors.\n`);
    }
  }
});
