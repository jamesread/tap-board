# Regenerates marketing screenshots against a throwaway preview server of the
# production build. Tap Board has no backend, so there are no containers: the
# "seed" is fictional game state applied by the setup scripts in scripts/,
# driven by seed/fixtures.json. `manifest` regenerates screenshot-manifest.yaml
# from screenshots.ini. Run `make` here; the server is always stopped.

ROOT := $(abspath ../../..)
HERE := $(abspath .)
TMP := $(HERE)/tmp

FRONTEND_PORT := 18400
FRONTEND_URL := http://127.0.0.1:$(FRONTEND_PORT)

.PHONY: all build up shoot manifest down clean

all:
	@$(MAKE) build up shoot manifest; rc=$$?; $(MAKE) down; exit $$rc

build:
	[ -d $(ROOT)/node_modules ] || (cd $(ROOT) && npm ci)
	cd $(ROOT) && npm run build

up:
	mkdir -p $(TMP)
	cd $(ROOT) && { npx vite preview --host 127.0.0.1 --port $(FRONTEND_PORT) --strictPort > $(TMP)/frontend.log 2>&1 & echo $$! > $(TMP)/frontend.pid; }
	@for i in $$(seq 60); do curl -fsS $(FRONTEND_URL)/ >/dev/null 2>&1 && exit 0; sleep 1; done; \
		echo "Preview server did not start; see $(TMP)/frontend.log"; exit 1

shoot:
	repo-helper screenshot --config screenshots.ini

manifest:
	./generate-manifest.py

down:
	-@[ -f $(TMP)/frontend.pid ] && pkill -P $$(cat $(TMP)/frontend.pid) 2>/dev/null; \
		[ -f $(TMP)/frontend.pid ] && kill $$(cat $(TMP)/frontend.pid) 2>/dev/null; \
		rm -f $(TMP)/frontend.pid; true

clean: down
	rm -rf $(TMP)
