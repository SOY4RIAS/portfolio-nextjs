import time
from playwright.sync_api import sync_playwright

def verify_portfolio():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Start the dev server in the background (assumed running on 3000)
        # Note: In the agent environment, we assume the user/agent starts it or we verify against static build start.
        # But here we will try to visit localhost:3000.
        # If not running, we might need to start it.
        # For this verification, I will assume I need to start it or check if it's running.

        try:
            page.goto("http://localhost:3000")
            page.wait_for_load_state("networkidle")

            # Check Title
            title = page.title()
            print(f"Page Title: {title}")
            assert "Santiago Arias" in title

            # Check Hero Section for "SANTIAGO"
            # Since we use TextReveal, the text might be split in spans, but innerText should handle it.
            body_text = page.inner_text("body")
            assert "SANTIAGO" in body_text
            assert "ARIAS" in body_text
            print("Hero Text Verified.")

            page.screenshot(path="/home/jules/verification/disruptive_hero.png")
            print("Hero screenshot saved.")

            # Scroll to Experience
            page.evaluate("document.getElementById('experience').scrollIntoView()")
            time.sleep(1)
            page.screenshot(path="/home/jules/verification/disruptive_experience.png")

            # Check "Work Logs"
            assert "Work Logs" in page.inner_text("#experience")
            print("Experience Section Verified.")

            # Scroll to AI
            page.evaluate("document.getElementById('ai-expertise').scrollIntoView()")
            time.sleep(1)
            page.screenshot(path="/home/jules/verification/disruptive_ai.png")

            # Check "AI Architecture"
            assert "AI Architecture" in page.inner_text("#ai-expertise")
            print("AI Section Verified.")

        except Exception as e:
            print(f"Verification Failed: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_portfolio()
