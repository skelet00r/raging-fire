*** Consumable Routes ***
----

### [Index](index.md)

Route  | Method | Param | Data
-----|:--------:|:-----:|:-----:|
  /  |    GET   |   None  | None


### [Post](post.md)

Route  | Method | Param | Data
-----|:--------:|:-----:|:-----:|
/post  |    POST   |   none | bodyMD, title, author
/post  |    GET   |   id  | None
/post  |    PUT  |   id  | bodyMD
/post  |    DELETE   |   id  | None

### [Posts](posts.md)

Route  | Method | Param | Data
-----|:--------:|:-----:|:-----:|
/posts/latest  |    GET   |   None | None
/posts/popular/author  |    GET   |   author  | None
/posts/popular/views  |    GET  |   None  | None