# API

Here is APIs what we need to implement:

* Renew GPS location
```js
{
  type: 'endpoint',
  endpointId: '<Unique ID>'
  online: true,
  lat: <GPS Location>,
  lon: <GPS Location>
}
```
* Start Receiving GPS location
```js
{
  type: 'action',
  action: 'hookEndpoint',
  enabled: true
}
```
* Stop Receive GPS location
```js
{
  type: 'action',
  action: 'hookEndpoint',
  enabled: false
}
```

