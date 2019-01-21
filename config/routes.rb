Rails.application.routes.draw do

  devise_for :users
  root to: "data#index"

  get 'models/new/:id', to: 'models#new'
  post 'models/create', to: 'models#create'

  get 'models/index'

  get 'models/show'

  get 'models/edit'
  get 'models/proc'

  get 'oops', to: 'data#error'

  get 'datas', to: 'data#index'
  get 'datas/new', to: 'data#new'
  post 'create', to: 'data#create'
  get '/datas/:id', to: 'data#show'
  get '/datas/label/:id', to: 'data#label'
  get '/datas/threshold/:id', to: 'data#threshold'
  post 'update_docs', to: 'data#update_docs'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "/download/:id" , to: 'data#download_data'

  get "*path" => redirect("/")


end
