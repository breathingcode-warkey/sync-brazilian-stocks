FROM node:20 AS builder
WORKDIR /app
 
COPY package.json tsconfig.json tsconfig-build.json global-bundle.pem /app/
RUN npm install
 
RUN npm install otel-agent-nodejs --save
 
COPY src/ /app/src/
RUN ls -ltra
RUN npm run clean
RUN npm run build
 
FROM public.ecr.aws/lambda/nodejs:20
 
COPY --from=builder /app/dist ${LAMBDA_TASK_ROOT}/dist
COPY --from=builder /app/node_modules ${LAMBDA_TASK_ROOT}/node_modules
COPY --from=builder /app/global-bundle.pem ${LAMBDA_TASK_ROOT}/global-bundle.pem
 
ENV NODE_OPTIONS="--require otel-agent-nodejs"
 
RUN ls -R ${LAMBDA_TASK_ROOT}
 
CMD ["dist/main/app.lambdaHandler"]

