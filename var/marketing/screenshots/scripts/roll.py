"""Taps every dice board / panel once and waits for the tumble to finish."""
import os
import sys
import time

from selenium.webdriver.common.by import By

sys.path.insert(0, os.path.dirname(__file__))
import fixtures  # noqa: E402


def run(driver):
    targets = driver.find_elements(By.CSS_SELECTOR, "main .dice-panel")
    if not targets:
        targets = driver.find_elements(By.CSS_SELECTOR, "main .touch-board, main .coin-board")
    for target in targets:
        target.click()
    time.sleep(1.5)
    fixtures.settle(driver)
