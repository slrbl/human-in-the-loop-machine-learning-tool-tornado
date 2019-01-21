module ModelsHelper
  def to_hash(arr_sep=',', key_sep=':')
    array = self.split(arr_sep)
    hash = {}
    array.each do |e|
      key_value = e.split(key_sep)
      hash[key_value[0]] = key_value[1]
    end
    return hash
  end
end
