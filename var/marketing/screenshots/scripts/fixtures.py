"""Loads seed/fixtures.json and shared helpers for the setup scripts."""
import json
import os
import time

from selenium.webdriver.common.actions.action_builder import ActionBuilder
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

FIXTURES_PATH = os.path.join(os.path.dirname(__file__), "..", "seed", "fixtures.json")


def load():
    with open(FIXTURES_PATH, encoding="utf-8") as f:
        return json.load(f)


def press(button, times):
    """The +/- buttons fire once per Enter keypress (see repeatPress.js)."""
    if times > 0:
        button.send_keys(Keys.ENTER * times)


def rename(driver, name_button, name):
    name_button.click()
    time.sleep(0.2)
    field = driver.switch_to.active_element
    field.send_keys(Keys.CONTROL, "a")
    field.send_keys(name, Keys.ENTER)
    time.sleep(0.2)


def add_players(driver, wanted, row_selector):
    while len(driver.find_elements(By.CSS_SELECTOR, row_selector)) < wanted:
        driver.find_element(By.CSS_SELECTOR, ".score-pad-add-btn").click()
        time.sleep(0.1)


def settle(driver):
    """Clears focus rings and hover styles left behind by the scripted taps."""
    driver.execute_script("document.activeElement && document.activeElement.blur();")
    width, height = driver.execute_script("return [window.innerWidth, window.innerHeight];")
    actions = ActionBuilder(driver)
    actions.pointer_action.move_to_location(width - 20, height - 4)
    actions.perform()
    time.sleep(0.5)  # let hover/focus transitions finish
