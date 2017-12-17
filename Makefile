VERSION:=3

build:
	npm run build
	docker build -t blog2017:${VERSION} .
run:
	docker run --name blog2017 -it --rm -p :3000:3000 blog2017:${VERSION}
push-ali:
	docker tag blog2017:${VERSION}  registry.cn-hangzhou.aliyuncs.com/wkc/blog2017:${VERSION}
	docker push registry.cn-hangzhou.aliyuncs.com/wkc/blog2017:${VERSION}
