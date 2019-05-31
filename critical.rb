require 'nokogiri'
require 'css-parser'

def get_critical_classes()
  doc = Nokogiri::HTML(File.open('_site/index.html'))
  selectors = []
  doc.traverse do |node|
    flag = 'article'
    classname = node.attr('class').to_s
    id = node.attr('id').to_s
    if classname.include? flag || id.length > 0 && id == flag
      return selectors.uniq
    end
    selectors.push(classname.split(" ").map {|c| '.' + c})
    if id.length > 0
      selectors.push('#' + id)
    end
  end
end

puts get_critical_classes