# geo-endpoint-test
Create a server which returns location names based on a fuzzy match query string

## Details
The server should respond to the following route

    /cities?q=fuzzyMatchString

Where `fuzzyMatchString` will be a partial name of a location. For example

    /cities?q=barr

Could return a the following JSON response (NOTE: You dataset only contains GB locations, so the results will differ)

    {
      locations: [
        "Barra Mansa",
        "Barrackpur",
        "Barrancabermeja",
        "Barranquilla",
        "Barreiras",
        "Barretos",
        "Barrie"
      ]
    }

NOTE: You should only start fuzzy matches if 2 or more characters are in the search string.


## Implementation
You can use what ever server library you like but it must be written in [node](https://nodejs.org). The data of the cities must be stored in a [SQLite](https://www.sqlite.org/) database, and be loaded in from the [data source](data/) provided in this repo.

We suggest using <http://knexjs.org> for this, mainly because its super simple to configure with SQLite. 


## Data source
The data source is available in this repo in the [./data](data/) directory. The [readme](data/readme.txt) in that directory explains how to use the data.


# Bonus points
You'll get bonus points if you

 * Unit test your code
 * Provide good documentation
 * Sort results by population

Good luck!


