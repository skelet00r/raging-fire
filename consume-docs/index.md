**GET Index**
----
  Returns json data about server.

* **URL**

	/

* **Method:**

  `GET`

*  **URL Params**

	None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200
    **Content:** `{"code":200,"error":false,"message":{"name":"raging-fire","description":"Blog server","version":"0.0.0","author":"author"}}`

* **Error Response:**

	None

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```