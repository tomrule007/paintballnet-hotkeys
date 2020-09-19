# Websocket Message Snooping

## General Information

message (Current guesses)

| id | Description | types |
|----|---|--|
| "14" | | |
| "13" | tick data | |
| "12" | | |
| "10" | Game messages | |
|"05" | sent message? | |
|
---

## Tick Messages

```json
{"id":"13","data":{"cmd":"40","rHand":{"count":1,"name":"gun","desc":"a high-capacity semi-automatic paintball gun[rapidfire][rapidfire]","weight":25,"value":1490,"range":20},"lHand":{"count":0,"name":"","desc":"","weight":0,"value":0,"range":0}},"text":""}

{"id":"13","data":{"cmd":"32","dollars":47341},"text":""}

{"id":"13","data":{"cmd":"12","clear":false,"dir":8,"dist":0},"text":""}

{"id":"13","data":{"cmd":"26","clear":true,"dir":-1,"dist":-1},"text":""}
```

Interval = _____ ms ?

clear means ?


Messages (all id 13)

1) left & right hand status
2) cash amount
3) location ?
4) location ?

---

## shooting

send

```json
{"id":"05","text":"fire @ 149 1"}
```

receive

```json
{"id":"12","data":{"cmd":"22","throw":false},"text":""}

{"id":"12","data":{"cmd":"42"},"text":""}

{"id":"14","data":{"cmd":"36","updates":[{"cmd":"29","p1":0,"p2":97,"p3":5,"p4":6,"p5":1,"p6":"","p7":0}]},"text":""}

{"id":"14","data":{"cmd":"36","updates":[{"cmd":"29","p1":0,"p2":96,"p3":5,"p4":6,"p5":1,"p6":"","p7":0},{"cmd":"35","p1":0,"p2":97}]},"text":""}

{"id":"14","data":{"cmd":"36","updates":[{"cmd":"35","p1":1,"p2":95},{"cmd":"28","p1":1,"p2":95,"p3":6},{"cmd":"35","p1":0,"p2":96}]},"text":""}
````



start of game
```json
{"id":"10","text":"GAME: The next game is about to start."}

{"id":"10","text":"GAME: You are in a Survival game."}

{"id":"12","data":{"cmd":"41","gamesPlayed":22,"gamesTotal":35},"text":""}

{"id":"10","text":""}

{"id":"15","data":{"cmd":"15","players":[{"playerID":996,"handle":"tomrule007","status":"IN game","splatsEver":5709,"bots":9,"gamesToday":22,"gamesPriv":35,"teamName":"Marauders","idle":"","admin":false,"tournamentMaster":false,"spectator":false}]},"text":""}

{"id":"14","data":{"cmd":"36","updates":[{"cmd":"29","p1":25,"p2":36,"p3":1,"p4":7,"p5":1,"p6":"","p7":0},{"cmd":"35","p1":1,"p2":1},{"cmd":"35","p1":1,"p2":4},{"cmd":"35","p1":3,"p2":98},{"cmd":"35","p1":149,"p2":94},{"cmd":"35","p1":149,"p2":98}]},"text":""}
```

bots
```json
{"id":"10","text":"GAME: The bots and tokens (if any) have been dispersed."}

{"id":"10","text":"Bot Roster:\r\na gun bot\r\na sniper bot\r\na gun bot\r\na recon bot\r\na gun bot\r\na dumb bot\r\na kamikazi bot\r\na dumb bot\r\na gun bot"}

{"id":"14","data":{"cmd":"36","updates":[{"cmd":"29","p1":121,"p2":11,"p3":4,"p4":3,"p5":1,"p6":"","p7":0},{"cmd":"29","p1":132,"p2":19,"p3":7,"p4":13,"p5":1,"p6":"","p7":0}]},"text":""}

{"id":"14","data":{"cmd":"36","updates":[{"cmd":"29","p1":131,"p2":19,"p3":7,"p4":13,"p5":1,"p6":"","p7":0},{"cmd":"35","p1":132,"p2":19}]},"text":""}
```

reload
send

```json
{"id":"05","text":"dump boot gun & reload"}
```

recieve

```json
{"id":"16","data":{"cmd":"items","items":[{"count":1,"name":"box","desc":"a box of 25 cyan paintballs","weight":2,"value":30,"range":0},{"count":1,"name":"box","desc":"a box of 25 pink paintballs","weight":2,"value":30,"range":0},{"count":1,"name":"box","desc":"a box of 25 yellow paintballs","weight":2,"value":30,"range":0},{"count":1,"name":"box","desc":"a box of 25 green paintballs","weight":2,"value":30,"range":0},{"count":1,"name":"box","desc":"a box of 25 rainbow paintballs","weight":2,"value":30,"range":0},{"count":1,"name":"tube","desc":"a tube of 25 blue no-bounce paintballs","weight":2,"value":80,"range":0},{"count":1,"name":"gun","desc":"a paintball gun","weight":10,"value":150,"range":15},{"count":1,"name":"rifle","desc":"a paintball rifle","weight":20,"value":300,"range":30},{"count":1,"name":"gun","desc":"a semi-automatic paintball gun","weight":12,"value":450,"range":20},{"count":1,"name":"rifle","desc":"a semi-automatic paintball rifle","weight":24,"value":900,"range":40},{"count":1,"name":"gun","desc":"an ultra-light semi-automatic paintball gun","weight":6,"value":4500,"range":20},{"count":1,"name":"rifle","desc":"an ultra-light semi-automatic paintball rifle","weight":12,"value":9000,"range":40},{"count":1,"name":"gun","desc":"a free paintball gun[free]","weight":10,"value":0,"range":15},{"count":1,"name":"bag","desc":"a 10-ball bag of free paintballs","weight":1,"value":0,"range":0},{"count":1,"name":"mine","desc":"a proximity mine","weight":15,"value":50,"range":4},{"count":1,"name":"mine","desc":"a large proximity mine","weight":30,"value":100,"range":6},{"count":1,"name":"mine","desc":"a player-decoy proximity mine","weight":15,"value":75,"range":4},{"count":1,"name":"mine","desc":"an enemy-decoy proximity mine","weight":15,"value":75,"range":4},{"count":1,"name":"mine","desc":"a token-decoy proximity mine","weight":15,"value":75,"range":4},{"count":1,"name":"launcher","desc":"a grenade launcher","weight":30,"value":2000,"range":50},{"count":1,"name":"launcher","desc":"a paintrocket launcher","weight":30,"value":2500,"range":50},{"count":1,"name":"grenade","desc":"a paint grenade","weight":2,"value":5,"range":10},{"count":1,"name":"grenade","desc":"a big paint grenade","weight":5,"value":15,"range":5},{"count":1,"name":"basket","desc":"a basket of 10 big paint grenade","weight":60,"value":160,"range":0},{"count":1,"name":"paintrocket","desc":"a paint rocket","weight":5,"value":15,"range":50},{"count":1,"name":"crate","desc":"a crate of 10 paint rockets","weight":75,"value":175,"range":0},{"count":1,"name":"minigun","desc":"a powered minigun","weight":75,"value":10000,"range":40},{"count":1,"name":"uzi","desc":"a paintball Uzi","weight":20,"value":2500,"range":10},{"count":1,"name":"bucket","desc":"a bucket of minigun paintballs","weight":1,"value":202,"range":0},{"count":1,"name":"shotgun","desc":"a paintball shotgun","weight":20,"value":1000,"range":10},{"count":1,"name":"bucket","desc":"a bucket of paint[Moldy][June 14, 1999]","weight":10,"value":200,"range":4}]},"text":""}

{"id":"16","data":{"cmd":"locker","lockerWt":96,"maxWt":800,"items":[{"count":1,"name":"backpack","desc":"classic gear pack","weight":93,"value":3330,"range":0},{"count":1,"name":"2020 Fall Event","desc":"a 2020 Fall Event patch","weight":0,"value":100,"range":0},{"count":1,"name":"belt","desc":"a padded belt","weight":3,"value":150,"range":0}]},"text":""}

{"id":"12","data":{"cmd":"42"},"text":""}

{"id":"10","text":"You dump 1 of the paintball into the gun."}

{"id":"10","text":"Your 'a high-capacity semi-automatic paintball gun[rapidfire][rapidfire]' is fully loaded."}

{"id":"12","data":{"cmd":"42"},"text":""}
```

moving in game and getting splatted

```json
{"id":"14","data":{"cmd":"36","updates":[{"cmd":"29","p1":78,"p2":65,"p3":5,"p4":6,"p5":1,"p6":"","p7":0},{"cmd":"35","p1":78,"p2":64}]},"text":""}

{"id":"12","data":{"cmd":"21","x":77,"y":66},"text":""}

{"id":"14","data":{"cmd":"36","updates":[{"cmd":"29","p1":77,"p2":66,"p3":1,"p4":7,"p5":1,"p6":"","p7":0},{"cmd":"29","p1":93,"p2":68,"p3":7,"p4":2,"p5":1,"p6":"","p7":0},{"cmd":"35","p1":77,"p2":67},{"cmd":"35","p1":84,"p2":59}]},"text":""}

{"id":"05","data":{"cmd":"30","isPlayer":false,"byFlag":false,"name":"a cyan paintball (a gun bot)","location":"flag","x":77,"y":66},"text":""}

{"id":"10","text":"a cyan paintball (a gun bot) splatted you in the BODY!"}

{"id":"12","data":{"cmd":"25"},"text":""}

{"id":"15","data":{"cmd":"36","players":[{"playerID":996,"handle":"tomrule007","status":"AUTO","splatsEver":5717,"bots":9,"gamesToday":23,"gamesPriv":35,"teamName":"Marauders","idle":"","admin":false,"tournamentMaster":false,"spectator":false}]},"text":""}

{"id":"14","data":{"cmd":"36","updates":[{"cmd":"35","p1":78,"p2":65}]},"text":""}
```


