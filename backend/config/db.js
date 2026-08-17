import pg from 'pg';

const config = {
  user:"avnadmin",
  password:"AVNS_ENPGzGIrryeEhU0kBxa", 
  host:"pg-3289afdd-punvarat-7a2d.i.aivencloud.com",
  port:"22067", 
  database:"scholar",
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIB0DCCAXagAwIBAgIUJ6nimH3+AJEROx8xcQQuTbRkngIwCgYIKoZIzj0EAwMw
RjFEMEIGA1UEAww7YTNkZTQwYWMtNjk4MS00YWEwLWI1MTAtNTY2MzQ4NTFhM2M2
IEdFTiAxIFByb2plY3QgQ0EgR0VOIDIwHhcNMjYwNzI4MDEzMzExWhcNMzYwNzI1
MDEzMzExWjBGMUQwQgYDVQQDDDthM2RlNDBhYy02OTgxLTRhYTAtYjUxMC01NjYz
NDg1MWEzYzYgR0VOIDEgUHJvamVjdCBDQSBHRU4gMjBZMBMGByqGSM49AgEGCCqG
SM49AwEHA0IABF5On9foY7E4FvkryumZSYv7NXOygI+WHaA27DEWu28eOfh5mulj
CMD+FGzmxOhtvmAFVQSZzLGBw2bx+jMXmdWjQjBAMB0GA1UdDgQWBBQg++TJ7u9w
C+A8CqvxrrtyJ8DunjASBgNVHRMBAf8ECDAGAQH/AgEAMAsGA1UdDwQEAwIBBjAK
BggqhkjOPQQDAwNIADBFAiAQ+pvo0FrGnX/c8X2AUtmzrpNLXIESci3wTZorvxZ5
9wIhALzY8Cd85bRpyop8LQdCIb3qjXVPkDj+ueNCb7VJLLXQ
-----END CERTIFICATE-----`,
},
};

const client = new pg.Client(config);  
client.connect(); 

export default client;

