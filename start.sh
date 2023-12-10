#!/bin/bash

# Backend
xdotool type './api/pocketbase serve'
xdotool key Return

#dividimos la terminar 
xdotool key 'ctrl+shift+0'  

sleep 2
# Frontent
xdotool type 'npm run dev'
xdotool key Return