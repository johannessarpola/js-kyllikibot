# FROM arm32v7/node:10-slim
FROM node:10-alpine
RUN apt-get update
ENV TZ=Europe/Helsinki
ENV DISCORD_BOT_TOKEN=$DISCORD_BOT_TOKEN
ENV DISCORD_OWNER_ID=$DISCORD_OWNER_ID
ENV GOOGLE_CALENDAR_ID=$GOOGLE_CALENDAR_ID
ENV GOOGLE_SERVICE_ACCOUNT=$ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAiYXBpLXByb2plY3QtNDcwNzIwNjg1ODUzIiwKICAicHJpdmF0ZV9rZXlfaWQiOiAiNWQ4MjUyZGEyZDQ4Y2ZhYTA0NWE4MTEzZDgyNWRiNWVhMjYyNDYxYiIsCiAgInByaXZhdGVfa2V5IjogIi0tLS0tQkVHSU4gUFJJVkFURSBLRVktLS0tLVxuTUlJRXZBSUJBREFOQmdrcWhraUc5dzBCQVFFRkFBU0NCS1l3Z2dTaUFnRUFBb0lCQVFEWXpyZ0Fibm9yK3ZscFxudUw0SHRRVmhpRnJDN080MkthRFRaUEVtbjBFblFxODgwaWlndnI3K0xxbGZPZ0Y4aHNXODE3d3pyMUVSVnlsT1xuTTNPc0Y5dGVTU01TcWgxMlJNdVErakduQUFaNTJvNDVxNkpITUkwUDg3ZEp1RW1ZdWdJZS90amVHOENkVWcyalxuSUNBQUdjVkw1RDRtYm9DL3RVbU0xdEdHemJ6UHM0VUNtRVJBSzRTK3JWbmpDMjVJTm5jL1FmU3M0Z3cvZVYxVFxuUTlQSnV3YjZPb3E0eGFVcW4ranlLMTlrZjV4Z0pYMDg1bzFpZnptNUNtYVp4YUlKU1hudkFSeVAwWHl4WUZ0aVxuemZVZGdodjIvYnluUlFhM2E1Z1JJMFBjVWdGOUVpUU50MENMaUgwdC9iRUQ3c0pFUkxEZVFoRVdTazZrQmJ1clxuNDgvRTAyWjNBZ01CQUFFQ2dnRUFCbUU2MytSZ1d2ZjFLK3ZBUjhqSFlrSFpiZC83K0lNTUZQeGs3ajZFYzh2T1xuRFV1ZjMyOE5mcnhQeHBvVjNoeTNKK0h2UzFRTzNpUkM5bWFrTWoyM2VsUkxvR3A2R0hkWXlDamNtaTN4Z3Rkd1xuRlBsY2Vwek9vZGdKbmpVNmtUQjBESVp5U2tMbHpadFRCR2hYR0xtcGFSekx5V1M2RENvaEFuQjExUElyNnE2dlxuU0hkcTN1OFluek9nRUR1Z2ZFS0pobGFNWXlaOVJqaUlJY2krZ2xLQU1NZlhObTROWmd3VzlsR3h0Um44S2dtT1xuTDh0bi8yL2Y2SWZpYVQrUFNqMXQxWmQwdUcvbXc3Q0cyMG05cFk0ZlpXSllOQktTOS9sMUlDUG5RZG9oZjJROFxualJpU2s1djVIeWJhazdDYW1tMy9UQUxCck9pdUlLM2pPMU1FT3Y3QUdRS0JnUUQ2cm9ncS85NE50eXlxamM1YVxuaUsrRWwzWkJBemdjRjB5dnE4RmRpKzhxSDArL2FYemlOWlJYTFV4VEhUYWJKTFZRV04zczZjd2dvYmNWVmtqSFxuaU1OQkVETVBKaVZGRm5ra29uUXVhb2xyelU2V1h4TzdwSkNMTVBmR1lUeEd6Z0Z2aUVWTFp3Z1VqM1B1N0tPRlxuN0dIY1dZZTRSY2VWRzQ3VzI4Nno2YTljWHdLQmdRRGRhRGF1enhNdXBMVUVreEtpeSsrVWZTeTFmcXVzZnNBY1xucDNXdDYxd24wYS9zSU5xOCtHNkhzVVZDTTBnS1VvRzhBcStFQkxKamNQVFBhN2FvdjcrZjhkQzdkTitoSURVaFxuSTI2eE9LMUxpbXgvNVhXVjNwQk5ISkM0NnIwa05yTkNnOVgxWWtuQXordzVuMmFLMjU5dWdKc1BoRlYwSUREUVxuMzNLdjdxZ3M2UUtCZ0RWUk44OEZlc0lxQ29yLy9EclBSWjJLNVhEd2NWZXdNUFJRTUtGbjZPZHBuM21Ud3ljTlxueEU1Q2FUQm9UenZ5TThveURJbWVOSGRnVGVOdzVhdml6N3lmNkd3NWJjWGpBTU1rOWxjRSs5Tjg2RkVkU2NJb1xuUDBJTG1UZU5hTmVhYXozQW14UnRobzl3NzNTS3lrRHF4T21yOVN6aFVwREpPcmxDS1JXbEIxSTdBb0dBY2QwdVxuZ2lnc2pVaFhiOHJUUXJYdXVFYkh2Mjh0aXNDRXZEZkM1WGF0SmkxSWMvOVJmdTJrcWxRWWNqczlTVkcxTnFPS1xuOERJYUs5bmpqT2l3UDRpZFcveFloSTlPa3VhbGJDMTB0OStWLzh0b2tUM0lneEs2MDIxbFlEUVlvWThnRVkwTFxuYys3Z1R6Q2ZJK00rTVJ0Um10cTQ0L29DbUg0Vm5OWE5mWDBYTUVFQ2dZQUI5akVHOGw3NkQ1bjE2bDllQ0NZN1xudkpUVFIzaUhkWlpiNTlZcnl6ZEhkRDVlMlFxYVNyL1Z2b0tpclZ4L3dhREl5VUUwZGl6NlNlSTVPWjhyTGJrOFxuQTRJbkVOajBacnZESTdXM0tiTDVjQkJObEV5Q2F3NmkvQjNLYlBOYU5JVW9WZkd3NXZGOHBBaGprT2ptODlkblxuMWVORUFQc0lFYm01di9ydFE3UFUvZz09XG4tLS0tLUVORCBQUklWQVRFIEtFWS0tLS0tXG4iLAogICJjbGllbnRfZW1haWwiOiAia3lsbGlra2lAYXBpLXByb2plY3QtNDcwNzIwNjg1ODUzLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwKICAiY2xpZW50X2lkIjogIjEwMzQ0MjYwMzkxNzkwMjczMDc4OCIsCiAgImF1dGhfdXJpIjogImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoIiwKICAidG9rZW5fdXJpIjogImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi90b2tlbiIsCiAgImF1dGhfcHJvdmlkZXJfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvY2VydHMiLAogICJjbGllbnRfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9yb2JvdC92MS9tZXRhZGF0YS94NTA5L2t5bGxpa2tpJTQwYXBpLXByb2plY3QtNDcwNzIwNjg1ODUzLmlhbS5nc2VydmljZWFjY291bnQuY29tIgp9
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]
