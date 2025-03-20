#!/usr/bin/bash
single_output=$(mktemp)
load_balancer_output=$(mktemp)

drill -q --benchmark standalone-test.yml --stats >$single_output
drill -q --benchmark lb-test.yml --stats > $load_balancer_output

diff -y $single_output $load_balancer_output
