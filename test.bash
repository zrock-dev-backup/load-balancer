#!/usr/bin/bash

single=http://localhost:3001/api/server-info
load_balancer=http://localhost:3000/api/server-info
amount_request=30000
concurrency=2500

single_output=$(mktemp)
load_balancer_output=$(mktemp)

ab -n $amount_request -c $concurrency $single > $single_output
ab -n $amount_request -c $concurrency $load_balancer > $load_balancer_output

diff -y $single_output $load_balancer_output
