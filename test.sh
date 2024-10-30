#!/bin/sh
npx nx run-many -t lint --fix --skip-nx-cache
npx nx run-many -t lint --skip-nx-cache
npx nx run-many -t test --skip-nx-cache
npx nx run-many -t e2e --skip-nx-cache
npx nx run-many -t build --skip-nx-cache
