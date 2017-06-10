require 'net/http'
require 'json'
 
url = 'https://api.instagram.com/v1/users/274431104/media/recent/?access_token=274431104.1677ed0.08a0149dd07e441baf9b054ce12e4c5f'
uri = URI(url)
response = Net::HTTP.get(uri)
r = JSON.parse(response)

puts r['data'].length

last = 1495923307

puts r['data'].select { |post| post['created_time'].to_i > last && post['tags'].include?('blackwood') }[0]['images']['standard_resolution']

# arbitrary created after time: 
