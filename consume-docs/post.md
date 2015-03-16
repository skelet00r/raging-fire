**GET Post**
----
  Returns json data about a single post.

* **URL**

	/post

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `id=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200
    **Content:** `{ code : 200, error : false, message : { _id : 'id', bodyMD : 'markdown' title : 'title', author : 'author', __v : 'version', views : 'views', created : 'created'  } }`

* **Error Response:**

  OR

  * **Code:** 400 BAD REQUEST
    **Content:** `{ code : 400, error : true, message : 'Malformed request'}`

  * **Code:** 404 NOT FOUND
    **Content:** `{code : 400, error : true, message : 'Post could not be found' }`


  OR

  * **Code:** 500 SERVER ERROR
    **Content:** `{ code : 500, error : true, message : 'mongo.message' }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/post?id=POST_ID",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

**POST Post**
----

  Creates new post.

* **URL**

	/post

* **Method:**

  `POST`

*  **URL Params**

	None

* **Data Params**

  `{ bodyMD : 'markdown', title : 'title', author : 'author' }`

* **Success Response:**

  * **Code:** 200
    **Content:** `{ code : 200, error : false, message : { _id : 'id', title : 'title'} }`
 
* **Error Response:**

  * **Code:** 500 SERVER ERROR
    **Content:** `{ code : 500, error : true, message : 'mongo.message' }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/post",
      dataType: "json",
      type : "POST",
      data : {
      	bodyMD : 'String',
          title : 'String',
          author : 'String'
      }
      }
      success : function(r) {
        console.log(r);
      }
    });
  ```

**PUT Post**
----

  Updates post.

* **URL**

	/post

* **Method:**

  `PUT`

*  **URL Params**

   `id=[string]`

* **Data Params**

  `{ bodyMD : 'markdown'}`

* **Success Response:**

  * **Code:** 200
    **Content:** `{ code : 200, error : false, message : { _id : 'id', title : 'title'} }`

* **Error Response:**

  OR

  * **Code:** 400 BAD REQUEST
    **Content:** `{ code : 400, error : true, message : 'Malformed request'}`

  * **Code:** 404 NOT FOUND
    **Content:** `{code : 400, error : true, message : 'Post could not be found' }`


  OR

  * **Code:** 500 SERVER ERROR
    **Content:** `{ code : 500, error : true, message : 'mongo.message' }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/post?id=POST_ID",
      dataType: "json",
      type : "PUT",
      data : {
      	bodyMD : 'String'
      }
      }
      success : function(r) {
        console.log(r);
      }
    });
  ```

**DELETE Post**
----

  Deletes post.

* **URL**

	/post

* **Method:**

  `DELETE`

*  **URL Params**

   `id=[string]`

* **Data Params**

	None

* **Success Response:**

  * **Code:** 200
    **Content:** `{ code : 200, error : false, message : { title : 'Successfully deleted post: title'} }`

* **Error Response:**

  OR

  * **Code:** 400 BAD REQUEST
    **Content:** `{ code : 400, error : true, message : 'Malformed request'}`

  * **Code:** 404 NOT FOUND
    **Content:** `{code : 400, error : true, message : 'Post could not be found' }`


  OR

  * **Code:** 500 SERVER ERROR
    **Content:** `{ code : 500, error : true, message : 'mongo.message' }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/post?id=POST_ID",
      dataType: "json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });
  ```