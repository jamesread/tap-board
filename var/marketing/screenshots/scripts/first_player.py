"""Sets the player count and picks a (seeded) first player."""
import os
import sys
import time

from selenium.webdriver.common.by import By

sys.path.insert(0, os.path.dirname(__file__))
import fixtures  # noqa: E402

DEFAULT = 4


def run(driver):
    minus, plus = driver.find_elements(By.CSS_SELECTOR, ".first-player-btn")
    delta = fixtures.load()["first_player"]["players"] - DEFAULT
    fixtures.press(plus if delta > 0 else minus, abs(delta))
    driver.find_element(By.CSS_SELECTOR, ".first-player-pick").click()
    time.sleep(0.3)
    fixtures.settle(driver)
