require "yaml"
require "erb"
require "fileutils"
require "cssminify"
require "net/http"
require "json"
require "open-uri"

source = YAML.load_file("src/data.yml")

class DataBinding
  def initialize(hash)
    @hash = hash.dup
  end
  def method_missing(meth, *args, &block)
    @hash[meth.to_s]
  end
  def get_binding
    binding
  end
end

data = source

# Sweeten date info before creating 'data' variables for HTML template.
# Add a property "future" to indicate next gig.
data["history"] = source["history"].each do |show| 
  show["month"] = Date::MONTHNAMES[show["date"].month][0..2].upcase
  show["future"] = show["date"] > Date.today
  show["today"] = show["date"] == Date.today
  show
end

booked = data["history"].index{ |s| s["future"] || s["today"] }
upcoming = (booked ? booked : data["history"].length) - 1 

data["upcoming"] = data["history"].slice(upcoming, 3)
data["timesigs"] = ["last", "next", "future"]

template = ERB.new File.read("src/index.html.erb"), nil, "%"

File.open("dist/index.html", "w") { |file|
  file.write(template.result(DataBinding.new(data).get_binding))
}

quote = ERB.new File.read("src/pages/quote/index.html.erb"), nil, "%"

FileUtils.mkdir_p "dist/quote"
File.open("dist/quote/index.html", "w") { |file|
  file.write(quote.result(DataBinding.new(data).get_binding))
}
 
# url = 'https://api.instagram.com/v1/users/274431104/media/recent/?access_token=' + ENV["INSTAGRAM_TOKEN"]
# uri = URI(url)
# response = Net::HTTP.get(uri)
# r = JSON.parse(response)
# FileUtils.mkdir_p "dist/insta"

# last = (File.read("dist/insta/last.txt") || 0).to_i

# lastpost = r['data'].select { |post| post['created_time'].to_i > last && post['tags'].include?('blackwood') }[0]

# if (lastpost) 

#   download = open(lastpost['images']['standard_resolution']['url'])
#   IO.copy_stream(download, 'dist/insta/last.jpg')
  
#   FileUtils.mkdir_p "dist/insta"
#   File.write("dist/insta/last.txt", lastpost["created_time"])
# end

File.write("dist/main.css", CSSminify.compress(File.open("src/main.css")))
File.write("dist/main.js", File.read("src/main.js"))
File.write("dist/CNAME", "blackwood.io")

puts "Built at " + Time.now.to_s