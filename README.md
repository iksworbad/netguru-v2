# netguru-v2

Install docker

1) `yarn`
2) `yarn docker`

3)
`yarn build && yarn start`

or 

`yarn start:dev`

## Example requests

GET localhost:8080/api/movies

POST localhost:8080/api/movies

```json
{
  "title": "terminator 2",
  "type": "movie", //optional
  "plot": "short", //optional
  "year": 1991 //optional
}
```


GET localhost:8080/api/comments

POST localhost:8080/api/comments

```json
{
  "id_video": 1,
  "comment": "hello"
}
```

