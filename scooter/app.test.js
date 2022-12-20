import { until } from "selenium-webdriver"

let timer = 1000

jest.setTimeout(timer * 120)


// Sign Up Elements
let idInputSignUp = {
  name: "user_name",
  Gender: "gender",
  Birthday: "birthday",
  Email: "emailSignup",
  Number: "mobileNumberSignUp",
  Password: "passwordSignUp",
  PasswordRepid: "passwordSignUpRepid"
}

let idButtonSignUp = {
  signUp: "signup",
  nextOne: "next1SignUp",
  nextTwo: "next2SignUp",
  submit: "submitSignUp"
}

// Sign In Elements
let idInputSignIn = {
  Email: "emailSignIn",
  Password: "passwordSignIn",
  otpFieldOne: "otpFildOne"
}

let idButtonSignIn = {
  signIn: "login",
  nextOne: "next1SignInButton",
  nextTwo: "next2SignIn"
}

// Delete User Elemet
let idButtonDelete = {
  avatarHome: "avatarHome",
  delete: 'deleteUserButton'
}

// PayPal Fields and Values

let inputPaypal = {
  creditAdd: "paypalAddCredit",
  paypalButton: "paypal-button-number-0",
  add: "paypalAddCreditButton",
  pay: "confirmButtonTop",
  email: "email",
  next: "btnNext",
  password: "password",
  frame: "component-frame",
  signIn: "btnLogin",
  payButton: "payment-submit-btn"
}

let paypal = {
  email: "sb-fbirh17548685@personal.example.com",
  password: "UUhf=W*6",
  value: "20"
}

// Book Scooter Value

let scooterIds = {
  scooterMarker: "leaflet-marker-icon",
  chooseScooterButton: "chooseScooterButton",
  startRideButton: "startRideButton",
  stopRideButton: "stopRideButton"
}
// User Values
/*
For Testing Purposes we build a Backdoor that access the one as valid Otp token!
*/
let user = {
  name: "Jest Test",
  Gender: "male",
  Birthday: "03-01-2022",
  Email: "it1-zeumno@student.itech-bs14.de",
  Number: "+491717007",
  Password: "dummy",
  otp: "1"
}

async function clickElement(id) {
  console.log(`Try to click the Element with the Id ${id}`)
  let element = await driver.findElement(By.id(id))
  let condition = until.elementIsEnabled(element)
  let pos = await driver.findElement(By.id(id)).getRect()
  console.log("pos", pos)
  await driver.wait(async driver => condition.fn(driver), 10 * timer)
  condition = until.elementIsVisible(element)
  await driver.wait(async driver => condition.fn(driver), 10 * timer)
  await driver.actions({ async: true })
    .clear()

  await driver.actions({ async: true })
    .pause(timer / 2)
    .click(element)
    .pause(timer / 2)
    .perform()

  console.log('Succses!')
}

async function enterText(id, text) {
  console.log(`Try to change Value from Input: ${id} to: ${text} `)
  let element = await driver.findElement(By.id(id))
  let condition = until.elementIsEnabled(element)
  await driver.wait(async driver => condition.fn(driver), 2 * timer)

  await driver.actions({ async: true })
    .pause(timer / 2)
    .perform();


  let tag = await element.getTagName()
  expect(tag).toBe("input")
  let pos = await driver.findElement(By.id(id)).getRect()
  console.log("pos", pos)

  let color = await driver.findElement(By.id(id)).getCssValue('color');
  console.log("color", color)

  await driver.actions({ async: true })
    .click(element)
    .pause(timer / 2)
    .perform()

  await driver.actions({ async: true })
    .sendKeys(text)
    .pause(timer / 2)
    .perform()

  if (id === 'birthday') {
    console.log('Checking date...')
    console.log('Transforming date...')
    let splitDate = text.split('-')
    let transDate = splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1]
    expect(await element.getAttribute("value")).toBe(transDate)
  } else {
    expect(await element.getAttribute("value")).toBe(text)
  }

  console.log('Succses!')
}

async function clickElementClassName(className) {
  console.log(`Try to click the Element with the Id ${className}`)
  let element = await driver.findElement(By.className(className))
  let condition = until.elementIsEnabled(element)
  let pos = await driver.findElement(By.className(className)).getRect()
  console.log("pos", pos)
  await driver.wait(async driver => condition.fn(driver), 10 * timer)
  condition = until.elementIsVisible(element)
  await driver.wait(async driver => condition.fn(driver), 10 * timer)
  await driver.actions({ async: true })
    .clear()

  await driver.actions({ async: true })
    .pause(timer / 2)
    .click(element)
    .pause(timer / 2)
    .perform()

  console.log('Succses!')
}

async function changeFrame(className) {
  console.log(`Try to change the Frame with the class ${className}`)

  let element = await driver.findElement(By.className(className))
  let elementId = await element.getAttribute("id")

  console.log(`The Element with the class ${className} have the id: ${elementId} `)

  await driver.switchTo().frame(elementId)

  console.log('Succses!')
}
async function wait(second) {
  await driver.sleep(timer * second)
}
async function changeWindow(className, id) {
  //Store the ID of the original window
  const originalWindow = await driver.getWindowHandle();
  console.log('originalWindow', originalWindow);

  //Check we don't have other windows open already
  (await driver.getAllWindowHandles()).length === 1;

  console.log('Clicking the Link...');
  //Click the link which opens in a new window;
  await clickElementClassName(className);

  //Wait for the new window or tab
  console.log('try to switch the Window...')
  //Loop through until we find a new window handle
  const windows = await driver.getAllWindowHandles();
  windows.forEach(async handle => {
    if (handle !== originalWindow) {
      await driver
        .switchTo()
        .window(handle);
      console.log(`Switch to Window with the id ${handle}`)
    }
  });
  await wait(5)
  let element = await driver.findElement(By.id(id), 10 * timer)
  let condition = until.elementIsEnabled(element)
  await driver.wait(async driver => condition.fn(driver), 10 * timer)
}

async function login() {
  // Go to the Sign UP Form
  await clickElement(idButtonSignIn.signIn)
  // File User credentials
  await enterText(idInputSignIn.Email, user.Email)
  await enterText(idInputSignIn.Password, user.Password)
  await clickElement(idButtonSignIn.nextOne)
  //Otp Credentials
  await enterText(idInputSignIn.otpFieldOne, user.otp)
  await clickElement(idButtonSignIn.nextTwo)
}

afterEach(async () => (cleanup()));
test('SignUp', async () => {
  // Connect to the Side
  await driver.get('https://localhost:3006')

  // Chech if the Side is up
  await driver.getTitle()
    .then(title => { expect(title).toBe('Scooter'); });

  // Go to the Sign UP Form
  await clickElement(idButtonSignUp.signUp)
  // File Input first Form
  await enterText(idInputSignUp.name, user.name)
  await enterText(idInputSignUp.Birthday, user.Birthday)
  await clickElement(idButtonSignUp.nextOne)
  // File Input second Form
  await enterText(idInputSignUp.Email, user.Email)
  await enterText(idInputSignUp.Number, user.Number)
  await clickElement(idButtonSignUp.nextTwo)
  // File Input third Form
  await enterText(idInputSignUp.Password, user.Password)
  await enterText(idInputSignUp.PasswordRepid, user.Password)
  await clickElement(idButtonSignUp.submit)
});

test('Log In', async () => {
  // Connect to the Side
  await driver.get('https://localhost:3006')

  // Chech if the Side is up
  await driver.getTitle()
    .then(title => { expect(title).toBe('Scooter'); });

  // Go to the Sign UP Form
  await login()
});

test('Add Credits over PayPal', async () => {
  // Connect to the Side
  await driver.get('https://localhost:3006')
  // Chech if the Side is up
  await driver.getTitle()
    .then(title => { expect(title).toBe('Scooter'); });
  // Login
  await login()
  // Add Credit
  await enterText(inputPaypal.creditAdd, paypal.value)
  await clickElement(inputPaypal.add)
  // Switch to the frame
  await changeFrame(inputPaypal.frame);
  await wait(2)
  // New Window
  await changeWindow(inputPaypal.paypalButton, inputPaypal.email)
  // Insert Values
  await enterText(inputPaypal.email, paypal.email);
  await clickElement(inputPaypal.next);
  await enterText(inputPaypal.password, paypal.password);
  await clickElement(inputPaypal.signIn);
  await wait(5)
  await clickElement(inputPaypal.payButton);
  await driver.navigate().refresh();
});

test('Booking Scooter', async () => {
  // Connect to the Side
  await driver.get('https://localhost:3006')
  // Chech if the Side is up
  await driver.getTitle()
    .then(title => { expect(title).toBe('Scooter'); });
  // Login
  await login()
  //Select Scooter
  await clickElementClassName(scooterIds.scooterMarker);
  await clickElement(scooterIds.chooseScooterButton)
  await clickElement(scooterIds.startRideButton)
  await clickElement(scooterIds.stopRideButton)
  await clickElement(scooterIds.stopRideButton)
  await wait(3)
});

test('Log In and Delete account!', async () => {
  // Connect to the Side
  await driver.get('https://localhost:3006')

  // Chech if the Side is up
  await driver.getTitle()
    .then(title => { expect(title).toBe('Scooter'); });

  await login()

  // Go to User Page
  await clickElement(idButtonDelete.avatarHome)
  await clickElement(idButtonDelete.delete)
});
