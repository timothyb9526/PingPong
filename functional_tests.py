from selenium.webdriver import Firefox
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as Ec


class TestLogin:
    def setup_method(self):
        self.browser = Firefox()
        self.browser.get("http://localhost:5500/")

    def test_login_success(self):
        login = self.browser.find_element_by_id("login")
        login.click()
        username = self.browser.find_element_by_id("username")
        password = self.browser.find_element_by_id("password")
        button = self.browser.find_element_by_class_name("login-btn")
        username.send_keys("king")
        password.send_keys("james")
        button.click()
        element = WebDriverWait(self.browser, 10).until(
            Ec.text_to_be_present_in_element((By.ID, "welcome-user"), "king"))
        # assert "king" in element.get_attribute("innerText")

    def test_login_fail(self):
        login = self.browser.find_element_by_id("login")
        login.click()
        username = self.browser.find_element_by_id("username")
        password = self.browser.find_element_by_id("password")
        button = self.browser.find_element_by_class_name("login-btn")
        username.send_keys("nooicdn")
        password.send_keys("jdjd")
        button.click()
        element = WebDriverWait(self.browser, 10).until(
            Ec.text_to_be_present_in_element(
                (By.ID, "invalid"),
                "Username or password is incorrect, Please try again."))

    def teardown_method(self):
        self.browser.quit()


class TestRegister:
    def setup_method(self):
        self.browser = Firefox()
        self.browser.get("http://localhost:5500/")

    def test_register_success(self):
        register = self.browser.find_element_by_id("register")
        register.click()
        username = self.browser.find_element_by_id("name")
        password = self.browser.find_element_by_id("code")
        passwordRepeat = self.browser.find_element_by_id("code_repeat")
        button = self.browser.find_element_by_class_name("register-btn")
        username.send_keys("oanvd")
        password.send_keys("jjfasd")
        passwordRepeat.send_keys("jjfasd")
        button.click()
        element = WebDriverWait(self.browser, 10).until(
            Ec.text_to_be_present_in_element((By.ID, "welcome-user"), "oanvd"))
        # assert "king" in element.get_attribute("innerText")

    # def test_register_fail(self):
    #     register = self.browser.find_element_by_id("register")
    #     register.click()
    #     username = self.browser.find_element_by_id("name")
    #     password = self.browser.find_element_by_id("code")
    #     passwordRepeat = self.browser.find_element_by_id("code_repeat")
    #     button = self.browser.find_element_by_class_name("register-btn")
    #     username.send_keys("king")
    #     password.send_keys("james")
    #     passwordRepeat.send_keys("james")
    #     button.click()
    #     element = WebDriverWait(self.browser, 10).until(
    #         Ec.text_to_be_present_in_element((By.ID, "notAvailable"), ""))

    def teardown_method(self):
        self.browser.quit()
