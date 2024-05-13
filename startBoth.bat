@echo off
cd ./B*
start cmd /k npm run dev
cd ../F*
start cmd /k npm run dev
