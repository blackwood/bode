require "yaml"
require "erb"
require "fileutils"
require "cssminify"

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

File.write("dist/main.css", CSSminify.compress(File.open("src/main.css")))
File.write("dist/main.js", File.read("src/main.js"))
File.write("dist/CNAME", "blackwood.io")

puts "Built at " + Time.now.to_s