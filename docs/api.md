# GraphQL API

For API requests you need to be authorized. Use the `/auth/login` endpoint via **POST** and a JSON body like:

```json
{
  "username": "admin",
  "password": "puschel"
}
```

The return value looks like:

```json
{
  "access_token": "ACCESS_TOKEN",
  "user_id": "USER_ID"
}
```

Use the **access_token** with the HTTP header like `Authorization: Bearer ACCESS_TOKEN` to query the API.

<!-- START graphql-markdown -->

## Query

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>findToys</strong></td>
<td valign="top">[<a href="#toy">Toy</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findToy</strong></td>
<td valign="top"><a href="#toy">Toy</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findToyByName</strong></td>
<td valign="top"><a href="#toy">Toy</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">name</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findRideEvents</strong></td>
<td valign="top">[<a href="#rideevent">RideEvent</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findRideEvent</strong></td>
<td valign="top"><a href="#rideevent">RideEvent</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findLastRideEventByRun</strong></td>
<td valign="top"><a href="#rideevent">RideEvent</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findSatisfiers</strong></td>
<td valign="top">[<a href="#satisfier">Satisfier</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findSatisfier</strong></td>
<td valign="top"><a href="#satisfier">Satisfier</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findSmartWatches</strong></td>
<td valign="top">[<a href="#smartwatch">SmartWatch</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findRatings</strong></td>
<td valign="top">[<a href="#rating">Rating</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findRating</strong></td>
<td valign="top"><a href="#rating">Rating</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findRuns</strong></td>
<td valign="top">[<a href="#run">Run</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findRun</strong></td>
<td valign="top"><a href="#run">Run</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findRunsByPlay</strong></td>
<td valign="top">[<a href="#run">Run</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">name</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findRides</strong></td>
<td valign="top">[<a href="#ride">Ride</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findRide</strong></td>
<td valign="top"><a href="#ride">Ride</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findPlays</strong></td>
<td valign="top">[<a href="#play">Play</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findPlay</strong></td>
<td valign="top"><a href="#play">Play</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findPlayByName</strong></td>
<td valign="top"><a href="#play">Play</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">name</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findActivePlay</strong></td>
<td valign="top"><a href="#play">Play</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findUsers</strong></td>
<td valign="top">[<a href="#user">User</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findUser</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findCurrentUser</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findUserByUsername</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">username</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findSettings</strong></td>
<td valign="top"><a href="#settings">Settings</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>updateToy</strong></td>
<td valign="top"><a href="#toy">Toy</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">toy</td>
<td valign="top"><a href="#toydto">ToyDto</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createRideEvent</strong></td>
<td valign="top"><a href="#rideevent">RideEvent</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">event</td>
<td valign="top"><a href="#rideeventdto">RideEventDto</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createRating</strong></td>
<td valign="top"><a href="#rating">Rating</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">rating</td>
<td valign="top"><a href="#ratingdto">RatingDto</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteRating</strong></td>
<td valign="top"><a href="#rating">Rating</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>startPlay</strong></td>
<td valign="top"><a href="#play">Play</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>stopPlay</strong></td>
<td valign="top"><a href="#play">Play</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createPlay</strong></td>
<td valign="top"><a href="#play">Play</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">play</td>
<td valign="top"><a href="#playdto">PlayDto</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatePlay</strong></td>
<td valign="top"><a href="#play">Play</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">play</td>
<td valign="top"><a href="#playdto">PlayDto</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deletePlay</strong></td>
<td valign="top"><a href="#play">Play</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createUser</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">user</td>
<td valign="top"><a href="#userdto">UserDto</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updateUser</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">user</td>
<td valign="top"><a href="#userdto">UserDto</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteUser</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updateSettings</strong></td>
<td valign="top"><a href="#settings">Settings</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">settings</td>
<td valign="top"><a href="#settingsdto">SettingsDto</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Objects

### Play

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timelines</strong></td>
<td valign="top">[<a href="#timeline">Timeline</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>runs</strong></td>
<td valign="top">[<a href="#run">Run</a>!]</td>
<td></td>
</tr>
</tbody>
</table>

### Rating

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>score</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>orgasms</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>message</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>date</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>run</strong></td>
<td valign="top"><a href="#run">Run</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>playId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
</tbody>
</table>

### Ride

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>enabled</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>index</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>length</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timeline</strong></td>
<td valign="top"><a href="#timeline">Timeline</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>satisfier</strong></td>
<td valign="top"><a href="#satisfier">Satisfier</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>toyAssignment</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### RideEvent

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>date</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>payload</strong></td>
<td valign="top"><a href="#json">JSON</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>run</strong></td>
<td valign="top"><a href="#run">Run</a></td>
<td></td>
</tr>
</tbody>
</table>

### Run

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>paused</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>active</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>startDate</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>runTime</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>play</strong></td>
<td valign="top"><a href="#play">Play</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ratings</strong></td>
<td valign="top">[<a href="#rating">Rating</a>!]</td>
<td></td>
</tr>
</tbody>
</table>

### Satisfier

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>type</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>settings</strong></td>
<td valign="top"><a href="#json">JSON</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ride</strong></td>
<td valign="top"><a href="#ride">Ride</a></td>
<td></td>
</tr>
</tbody>
</table>

### Settings

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>wifiSsid</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### SmartWatch

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>uuid</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### Timeline

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>play</strong></td>
<td valign="top"><a href="#play">Play</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>rides</strong></td>
<td valign="top">[<a href="#ride">Ride</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>toy</strong></td>
<td valign="top"><a href="#toy">Toy</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>toyId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
</tbody>
</table>

### Toy

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>type</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>uuid</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timelines</strong></td>
<td valign="top">[<a href="#timeline">Timeline</a>!]</td>
<td></td>
</tr>
</tbody>
</table>

### User

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>username</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>avatar</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gender</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ratings</strong></td>
<td valign="top">[<a href="#rating">Rating</a>!]</td>
<td></td>
</tr>
</tbody>
</table>

## Inputs

### PlayDto

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Validation: [matches: (^[\d\w ]+$), isNotEmpty]

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Validation: [isNotEmpty]

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timelines</strong></td>
<td valign="top">[<a href="#timelinedto">TimelineDto</a>!]!</td>
<td>

Validation: [arrayNotEmpty, isArray]

</td>
</tr>
</tbody>
</table>

### RatingDto

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>score</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

Validation: [max: (1), min: (0)]

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>orgasms</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Validation: [max: (10), min: (0)]

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>message</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Validation: [isNotEmpty]

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>runId</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### RideDto

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>enabled</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>toyAssignment</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Validation: [isEnum: (vibrate,warm,push,electrify,pattern)]

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>index</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Validation: [min: (0)]

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>length</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Validation: [min: (1)]

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>satisfier</strong></td>
<td valign="top"><a href="#satisfierdto">SatisfierDto</a>!</td>
<td>

Validation: [isNotEmpty]

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timelineId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
</tbody>
</table>

### RideEventDto

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>payload</strong></td>
<td valign="top"><a href="#json">JSON</a></td>
<td></td>
</tr>
</tbody>
</table>

### SatisfierDto

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>type</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Validation: [isEnum: (random,peak,manual,replay,smartWatch,ai)]

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>settings</strong></td>
<td valign="top"><a href="#json">JSON</a></td>
<td>

Validation: []

</td>
</tr>
</tbody>
</table>

### SettingsDto

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>adminPassword</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Validation: [matches: (^(?=._[A-Za-z])(?=._\d)(?=._[@$!%_#?&])[A-Za-z\d@$!%*#?&]+$), maxLength: (20), minLength: (6)]

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>wifiSsid</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>wifiPassword</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### TimelineDto

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>toyId</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Validation: [min: (1)]

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>rides</strong></td>
<td valign="top">[<a href="#ridedto">RideDto</a>!]!</td>
<td>

Validation: [arrayNotEmpty, isArray]

</td>
</tr>
</tbody>
</table>

### ToyDto

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Validation: [matches: (^[\d\w ]+$), isNotEmpty]

</td>
</tr>
</tbody>
</table>

### UserDto

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>username</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Validation: [matches: (^(?![_.])(?!.\*[_.]{2})[a-zA-Z0-9_]+(?<![_.])$), notEquals: (admin), maxLength: (20), minLength: (6)]

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Validation: [isNotEmpty]

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>password</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Validation: [matches: (^(?=._[A-Za-z])(?=._\d)(?=._[@$!%_#?&])[A-Za-z\d@$!%*#?&]+$), maxLength: (20), minLength: (6)]

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>avatar</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Validation: [isNotEmpty]

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gender</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Validation: [isEnum: (xx,xy)]

</td>
</tr>
</tbody>
</table>

## Scalars

### Boolean

The `Boolean` scalar type represents `true` or `false`.

### DateTime

A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.

### Float

The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).

### Int

The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.

### JSON

The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).

### String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.

<!-- END graphql-markdown -->
