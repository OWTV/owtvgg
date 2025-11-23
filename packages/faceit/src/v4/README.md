# Faceit V4 Data API

The [Faceit API documentation](https://docs.faceit.com/docs/data-api/data/)
includes a [Swagger spec](https://open.faceit.com/data/v4/docs/swagger.json),
so I generated a client using `swagger-codegen`. The following steps can be
skipped unless the API is updated or a new version is released.

```terminaloutput
# Install Java <= 22 from https://www.oracle.com/java/technologies/downloads/

# If you're on Windows like I am, you'll have to set JAVA_HOME (I got 21)
set JAVA_HOME=C:\Program Files\Java\jdk-21

# Navigate to the parent directory to avoid cloning inside this repository
cd ..

# Clone swagger-codegen
git clone https://github.com/swagger-api/swagger-codegen

# Enter the swagger-codegen repository
cd swagger-codegen

# Build the project
mvnw clean package

# Download the Swagger specification for the Faceit API
wget https://open.faceit.com/data/v4/docs/swagger.json -o swagger.json

# Generate a TypeScript client
java -jar modules/swagger-codegen-cli/target/swagger-codegen-cli.jar generate -i swagger.json -l typescript-fetch -o ../OWTV/faceit/src/swagger --additional-properties modelPropertyNaming=original,enumPropertyNaming=original

# Manually replace `portableFetch` with `fetch`, as the API is now natively
# supported by Node JS and there's no need for a polyfill.
```
