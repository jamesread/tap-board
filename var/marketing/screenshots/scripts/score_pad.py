"""Fills the score pad with the fictional players from seed/fixtures.json."""
import os
import sys

from selenium.webdriver.common.by import By

sys.path.insert(0, os.path.dirname(__file__))
import fixtures  # noqa: E402


def run(driver):
    players = fixtures.load()["score_pad"]
    fixtures.add_players(driver, len(players), ".score-pad-row")
    rows = driver.find_elements(By.CSS_SELECTOR, ".score-pad-row")
    for row, player in zip(rows, players):
        fixtures.rename(driver, row.find_element(By.CSS_SELECTOR, ".score-pad-name"), player["name"])
        plus = row.find_elements(By.CSS_SELECTOR, ".score-pad-btn")[1]
        fixtures.press(plus, player["score"])
    fixtures.settle(driver)
