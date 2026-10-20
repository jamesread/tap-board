"""Selects a timer preset (the timer is not started, so the image is stable)."""
import os
import sys

from selenium.webdriver.common.by import By

sys.path.insert(0, os.path.dirname(__file__))
import fixtures  # noqa: E402


def run(driver):
    label = fixtures.load()["turn_timer_preset"]
    for button in driver.find_elements(By.CSS_SELECTOR, ".timer-preset-btn"):
        if button.text.strip() == label:
            button.click()
            fixtures.settle(driver)
            return
    raise RuntimeError(f"timer preset {label!r} not found")
