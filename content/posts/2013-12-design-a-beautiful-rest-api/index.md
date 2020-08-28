---
title: "Design a beautiful REST API"
publishDate: "2013-12-04"
description: "Learn how to design a beautiful REST API."
keywords: "api"
featured: false
---

Every dev at some point has made decisions how his backend API should look like. If you’re coming from the web, then mostly for ajax calls. But what if that API should also address calls from other sources and clients.

To fill that gap i was watching an informative talk by Les Hazlewood about beautiful RESTful. I’ll cut this in several sections. This is merely an overview, the full coverage you can get from the youtube talk or the slides.

## Endpoint Naming

- Nouns, not verbs (No: getUser, Yes: /users/a1b2c3)
- Parameters not in URL (hassle if changes arise api.com/do/param1/param2/param3)

It should be divided into two fragments:

- Collection (api.com/users)
- Instance (api.com/users/a1b2c3)

## Behaviour

It’s a good thing to use different methods for calling the api. They don’t represent 1:1 the CRUD model. PUT and GET can be used for create and update.

- GET: read
- PUT: create, update
- POST: create, update (partial update, due to quota)
- DELETE: delete
- head: headers, no body

## Update / Create

Keyword here is **idempotent**. This means that it produces the same result if it’s been sent once or multiple times. To avoid having different states, the update should contain the full object in its entirety.

Partial updates can be done (using POST) if you’re concerned about your data quota.

You should give responses back for the PUT/POST:

- 201 OK (or 201 created for a create)
- location, where instance can be found (url: http://api.com/users/g4h5i6)

## Media Types

They tell the the server what format the client understands and prefers and how the client has to parse and process it.

- Request: accept header
- Response: content-type header

you can have your own media-type (application/json+foo), that has a defined specification or add additional parameters (application/json+foo;application) — see API Versioning for another possible use case.

## API Versioning

In case you make drastic changes, you still want to support the old API, to prevent problems with old implementations. There are possibilities to do so:

- URL: api.com/v1
- media-type: application/json+foo;application,v=1

## Linking

You want to retreive a resource, which contains other resources. Best practice is to provide an atomic resources. So you shouldn’t provide an endpoint as such asapi.com/UserWithAddress, rather have seperate endpoints for each. In a JSON it would look as follows:

```json
{
  "href": "http://api.com/users/a1b2c3",
  "name": "John",
  "lastname": "Smith",
  "address": {
    "href": "http://api.com/addresses/d4f5g6"
  }
}
```

The result doesn’t contain the all address properties, but the href one, which tells the requester exactly where the resource is located.

## Reference Expansion

In case you’d like to make only one request for the user and its address properties, you can provide an additional parameter:

- api.com/users/a1b2c3?expand=address

You can also request more than one reference expansion separated by a comma. In case the property doesn’t exist, a good practice is to return a 409 Conflict.

## Partial Representation

Usually you get all properties of a resource upon a request. You could list the wanted properties in a request like this to save bandwith:

- api.com/users/a1b2c3?expand=address(street,zip)

### Pagination

On Collection calls you may come across a lot of items that shouldn’t be requested all in one call. A possible pagination request could look like this:

- api.com/users?offset=0&limit=25

The returning JSON could look like the following:

```json
{
  "offset": 0,
  "limit": 25,
  "first": {
    "href": "http://api.com/users?offset=0"
  },
  "previous": null,
  "next": {
    "href": "http://api.com/users?offset=25"
  },
  "last": {
    "href": "http://api.com/users?offset=425"
  },
  "items": [{}, {}]
}
```

## Errors

Sometimes errors should tell the API caller more than only a return code, then this is a good way to do so.

- as descriptive as possible
- as much information as possible
- if your API is targeted at other devs, provide additional dev info

POST /users → 409 conflict:

```json
{
  "status": 409,
  "code": 40924,
  "property": "name",
  "message": "user named xyz already exists",
  "developerMessage": "user named xyz already exists. if you have a stale local cache, please expire it now",
  "moreInfo": "http://…"
}
```

## IDs

- should be opaque
- should be globally unique
- avoid sequential numbers
- good candidates: uuids, url64

## What the talk covers additionally

In the 1h 25min talk, Les Hazlewood covers other topics. Hop over, if you’d like to know more about these sections:

- Base URL
- Many to Many
- Return Values
- Method Overloading
- Caching & Etags
- Security
- Multi Tenancy
- Maintenance
