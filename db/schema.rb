# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20210417232022) do

  create_table "datasets", force: :cascade do |t|
    t.string "name"
    t.string "path"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "es_id"
    t.text "description"
    t.integer "inputs_count"
    t.integer "user_id"
    t.integer "human_labels_count"
    t.string "status"
    t.string "data_type"
  end

  create_table "memberships", force: :cascade do |t|
    t.integer "dataset_id"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trainings", force: :cascade do |t|
    t.float "acc"
    t.float "val_acc"
    t.integer "dataset_id"
    t.string "es_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "max_confidence"
    t.float "min_confidence"
    t.integer "seed_size"
    t.integer "compatible_human_machine_count"
    t.integer "humna_label_count"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
