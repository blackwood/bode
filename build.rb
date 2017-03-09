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

data["shows"] = source["shows"].each do |show| 
  show["month"] = Date::MONTHNAMES[show["date"].month][0..2].upcase
  show["future"] = show["date"] > Date.today
  show
end

template = ERB.new File.read("src/index.html.erb"), nil, "%"

File.open("dist/index.html", "w") { |file|
  file.write(template.result(DataBinding.new(data).get_binding)) 
}

File.write("dist/main.css", CSSminify.compress(File.open("src/main.css")))
File.write("dist/main.js", File.read("src/main.js"))
File.write("dist/CNAME", "blackwood.io")

puts "Built at " + Time.now.to_s