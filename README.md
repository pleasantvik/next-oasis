# Suspense

- Data fetching should be placed close to the component that needs it
- Suspense should be placed outside of the compoennt that fetches the data

# Error

- Errorboundary in Nextjs is a client component
- It's a client component cos it accepts a reset prop that uses click event

## SSR(Static vs Dynamic)

- Server and client are render on the server on initial render
- SSR is splited by route in Nextjs
-       -> Each router can either be static(prerender) or dynamic
        -> PPR(Partial prerendering) is a mix of the two

# STATIC RENDERING

- HTML is generated at build time, or periodically by re-fetching
-           -> Useful when data doesn't change often and is not personalized to user

## DYNAMIC RENDERING

- HTML is generated at request time by the user
-           -> Used when data changes frequesntly
            -> Rendering a route requires information that depends on request(e.g search params)

# N.B: Nextjs routes are usually generated staticly but swictches to dynamic in the following scenario

- 1. The route has a dynamic segment( page uses params)
- 2. searchParams are used in page component
- 3. headers() or cookies() re used in any of the route server component
- 4. An uncached data request is made in any route server component
-           ->We can force Nextjs to render a route dynamically using
            - 1. export const force dynamic = 'force-dynamic' from page.js
            - 2. export const revalidate = 0 from page.js
            - 3. {cache: 'no-store} added to a fetch request in any of the route server component
            - 4. noStore() in any of the server component

# Some Terminology

- Content Delivery Network (CDN): A network of servers located around the globe that cache and deliver a website static content (HTML, CSS JS) from as close as possible to each user

- Serverless computing: It allow us run server application code, majorly backend code without managing the server ourselves. We instead run a single function on a cloud provider: serverless function.
- The server is initailzed and active only for the duration the serverless funtion is running, unlike a traditionla Nodejs app where the server is constantly running

## generateStaticParams

- Usefulfor making dynamic page to static by getting all the possible dynamic ids beforehand
