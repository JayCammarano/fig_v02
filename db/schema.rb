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

ActiveRecord::Schema.define(version: 2020_09_25_195338) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alt_names", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", null: false
  end

  create_table "alt_names_artists", id: false, force: :cascade do |t|
    t.bigint "artist_id", null: false
    t.bigint "alt_name_id", null: false
  end

  create_table "artists", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
  end

  create_table "artists_releases", id: false, force: :cascade do |t|
    t.bigint "artist_id", null: false
    t.bigint "release_id", null: false
  end

  create_table "images", force: :cascade do |t|
    t.string "attachment"
    t.bigint "imageable_id"
    t.string "imageable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["imageable_type", "imageable_id"], name: "index_images_on_imageable_type_and_imageable_id"
  end

  create_table "labels", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "labels_releases", id: false, force: :cascade do |t|
    t.bigint "release_id", null: false
    t.bigint "label_id", null: false
  end

  create_table "releases", force: :cascade do |t|
    t.string "release_type", null: false
    t.string "embed_url"
    t.text "title", null: false
    t.integer "original_release_year"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "releases_tags", id: false, force: :cascade do |t|
    t.bigint "release_id", null: false
    t.bigint "tag_id", null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "role", default: "user", null: false
    t.string "username", null: false
  end

end
