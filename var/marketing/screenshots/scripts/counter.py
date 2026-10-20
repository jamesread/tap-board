"""Moves the counter to the value in seed/fixtures.json."""
import os
import sys

from selenium.webdriver.common.by import By

sys.path.insert(0, os.path.dirname(__file__))
import fixtures  # noqa: E402

DEFAULT = 50


def run(driver):
    buttons = driver.find_elements(By.CSS_SELECTOR, ".counter-btn")
    minus, plus = buttons[0], buttons[-1]
    delta = fixtures.load()["counter"] - DEFAULT
    fixtures.press(plus if delta > 0 else minus, abs(delta))
    fixtures.settle(driver)
