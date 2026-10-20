"""Sets fictional names and life totals from seed/fixtures.json."""
import os
import sys

from selenium.webdriver.common.by import By

sys.path.insert(0, os.path.dirname(__file__))
import fixtures  # noqa: E402

STARTING_LIFE = 20


def run(driver):
    players = fixtures.load()["life_counter"]
    fixtures.add_players(driver, len(players), ".life-panel")
    panels = driver.find_elements(By.CSS_SELECTOR, ".life-panel")
    for panel, player in zip(panels, players):
        fixtures.rename(driver, panel.find_element(By.CSS_SELECTOR, ".score-pad-name"), player["name"])
        minus, plus = panel.find_elements(By.CSS_SELECTOR, ".life-btn")
        delta = player["life"] - STARTING_LIFE
        fixtures.press(plus if delta > 0 else minus, abs(delta))
    fixtures.settle(driver)
