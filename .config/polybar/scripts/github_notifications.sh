#!/usr/bin/env bash
echo $(gh api -H "Accept: application/vnd.github+json" /notifications | jq 'length') | tr -d '[:space:]'
