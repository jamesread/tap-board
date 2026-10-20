"""Waits for the routed board to render, closes the sidebar on phone-sized
viewports (App.vue opens it on every load, covering the board), then seeds
Math.random so dice rolls, coin flips and first-player picks are identical on
every run."""
import os
import sys
import time

from selenium.webdriver.common.by import By

sys.path.insert(0, os.path.dirname(__file__))
import fixtures  # noqa: E402

# mulberry32: tiny deterministic PRNG.
SEEDED_RANDOM_JS = """
let a = arguments[0] >>> 0;
Math.random = function () {
  a = (a + 0x6D2B79F5) >>> 0;
  let t = a;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
"""


def run(driver):
    deadline = time.time() + 15
    while time.time() < deadline:
        if driver.find_elements(By.CSS_SELECTOR, "main > *"):
            break
        time.sleep(0.25)
    if driver.execute_script("return window.innerWidth;") < 800:
        driver.find_element(By.ID, "sidebar-toggler-button").click()
        time.sleep(0.5)
    driver.execute_script(SEEDED_RANDOM_JS, fixtures.load()["random_seed"])
    driver.execute_script("window.scrollTo(0, 0);")
