# OWTV Faceit Integrations

This directory collects various site tools that interact with Faceit. For now,
that means a generated Faceit client and database populator.

## Quickstart

After installing this package's dev dependencies, create a `.env` file
containing [your Faceit API key](https://developers.faceit.com/docs/auth/api-keys):

```
FACEIT_API_KEY=<your Faceit API key>
```

You should then be able to execute the following command:

```terminaloutput
npm run explore -- --help
```

The `explore` command provide a few ways to look through the Faceit API. At the
moment, it's mostly a proof-of-concept for the client library, but we hope to
use it to find and scrape pro championships and matches in the future.

## Active Work

The following are action items for this package in no particular order:

  - [ ] Figure out how to access OWCS championships. You cannot currently find
        them by exploring championships under the OWCS organizer.
  - [ ] Set up scraping routines to translate Faceit data into OWTV database
        models. Ideally we can make this part of the website UX.
