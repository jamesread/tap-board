DATE := $(shell date +%s)
IMAGE := ghcr.io/jamesread/tap-board:$(DATE)
IMAGE_LATEST := ghcr.io/jamesread/tap-board:latest

.PHONY: image container publish

image:
	docker build . -t $(IMAGE) -t $(IMAGE_LATEST)

container: image
	docker run --rm -p 8080:8080 $(IMAGE_LATEST)

publish: image
	docker push $(IMAGE)
	docker push $(IMAGE_LATEST)
