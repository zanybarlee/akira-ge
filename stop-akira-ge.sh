#!/bin/bash
# stop-akira-ge.sh

PIDS=$(ps -ef | grep -E 'pnpm start|run-script-os|./run start|turbo' | grep -v grep | awk '{print $2}')
if [ -n "$PIDS" ]; then
  echo "Killing Akira GE-related PIDs: $PIDS"
  kill -9 $PIDS
else
  echo "No Akira GE processes found."
fi
