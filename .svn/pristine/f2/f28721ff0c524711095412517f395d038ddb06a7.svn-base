<!--
****--@file     area
****--@date     2017/12/1 13:53
****--@author   YC
****--@describe 城市三级联动
-->
<template>
    <el-form :inline="inline" :labelWidth="labelWidth" :model="distpicker" ref="distpicker" :rules="distpickerRules">
        <el-form-item label="省：" prop="currentProvince">
            <el-select @change="getCities" v-model="distpicker.currentProvince" :disabled="disabled"
                       :placeholders="placeholders.province">
                <el-option v-for="(item, index) in provinces" :key="index" :value="item">{{ item }}</el-option>
            </el-select>
        </el-form-item>
        <template v-if="!onlyProvince">
            <el-form-item label="市：" prop="currentCity">
                <el-select @change="getAreas" v-model="distpicker.currentCity" :disabled="disabled"
                           :placeholders="placeholders.city">
                    <el-option v-for="(item, index) in cities" :key="index" :value="item">{{ item }}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="区/县：" v-if="!hideArea && areas.length != 0" prop="currentArea">
                <el-select v-model="distpicker.currentArea" :disabled="disabled"
                           :placeholders="placeholders.area" @change="getAreasVal">
                    <el-option v-for="(item, index) in areas" :key="index" :value="item">{{ item }}</el-option>
                </el-select>
            </el-form-item>
        </template>
    </el-form>
</template>

<script>
    import DISTRICTS from './districts';

    const DEFAULT_CODE = 100000

    export default {
        props: {
            inline: {type: Boolean, default: false},
            labelWidth: {type: [String, Number], default: ''},
            province: {type: [String, Number], default: ''},
            city: {type: [String, Number], default: ''},
            area: {type: [String, Number], default: ''},
            type: {type: String, default: ''},
            hideArea: {type: Boolean, default: false},
            onlyProvince: {type: Boolean, default: false},
            staticPlaceholder: {type: Boolean, default: false},
            placeholders: {
                type: Object,
                default() {
                    return {
                        province: '请选择',
                        city: '请选择',
                        area: '请选择'
                    }
                }
            },
            rules: {
                type: Object,
                default() {
                    return {
                        currentProvince: '',
                        currentCity: '',
                        currentArea: ''
                    }
                }
            },
            disabled: {type: Boolean, default: false}
        },
        data() {
            return {
                tab: 1,
                showCityTab: false,
                showAreaTab: false,
                provinces: [],
                cities: [],
                areas: [],
                distpicker: {
                    currentProvince: this.determineType(this.province) || '',
                    currentCity: this.determineType(this.city) || '',
                    currentArea: this.determineType(this.area) || ''
                },
                distpickerRules: this.rules
            }
        },
        created() {
            if (this.type != 'mobile') {
                this.provinces = this.getDistricts()
                this.cities = this.province ? this.getDistricts(this.getAreaCode(this.determineType(this.province))) : []
                this.areas = this.city ? this.getDistricts(this.getAreaCode(this.determineType(this.city), this.area)) : []
            } else {
                if (this.area && !this.hideArea && !this.onlyProvince) {
                    this.tab = 3
                    this.showCityTab = true
                    this.showAreaTab = true
                    this.areas = this.getDistricts(this.getAreaCode(this.determineType(this.city), this.area))
                } else if (this.city && this.hideArea && !this.onlyProvince) {
                    this.tab = 2
                    this.showCityTab = true
                    this.cities = this.getDistricts(this.getAreaCode(this.determineType(this.province)))
                } else {
                    this.provinces = this.getDistricts()
                }
            }
        },
        watch: {
            province(value) {
                this.distpicker.currentProvince = this.province || ''
                this.cities = this.determineValue(this.distpicker.currentProvince, this.placeholders.province)
            },
            city(value) {
                this.distpicker.currentCity = this.city || ''
                this.areas = this.determineValue(this.distpicker.currentCity, this.placeholders.city, this.distpicker.currentProvince)
            },
            area(value) {
                this.distpicker.currentArea = this.area || ''
            }
        },
        methods: {
            checkedData() {
                let flag = false;
                this.$refs.distpicker.validate((valid) => {
                    if (valid) {
                        flag = true;
                    }
                });
                return flag;
            },
            changeCurrentProvince(vaule) {
                this.$emit('province', this.setData(vaule))
                if (this.onlyProvince) this.emit('selected')
            },
            changeCurrentCity(value) {
                this.$emit('city', this.setData(value, this.distpicker.currentProvince))
                if (value && this.hideArea) this.emit('selected')
            },
            changeCurrentArea(value) {
                this.$emit('area', this.setData(value, this.distpicker.currentArea))
                if (value) this.emit('selected')
            },
            setData(value, check = '') {
                return {
                    code: this.getAreaCode(value, check) || '',
                    value: value || ''
                }
            },
            emit(name) {
                let data = {
                    province: this.setData(this.distpicker.currentProvince)
                }

                if (!this.onlyProvince) {
                    this.$set(data, 'city', this.setData(this.distpicker.currentCity))
                }

                if (!this.onlyProvince || this.hideArea) {
                    this.$set(data, 'area', this.setData(this.distpicker.currentArea))
                }
                this.$emit(name, data)
            },
            getCities() {
                this.distpicker.currentCity = ''
                this.distpicker.currentArea = ''
                this.cities = this.determineValue(this.distpicker.currentProvince, this.placeholders.province)
                this.cleanList('areas')
                if (this.cities == null) {
                    this.tab = 1
                    this.showCityTab = false
                }
                this.emit('selected')
            },
            getAreas() {
                this.distpicker.currentArea = ''
                this.areas = this.determineValue(this.distpicker.currentCity, this.placeholders.city, this.distpicker.currentProvince)
                if (this.areas == null) {
                    this.tab = 2
                    this.showAreaTab = false
                }
                this.emit('selected')
            },
            getAreasVal() {
                this.emit('selected')
            },
            resetProvince() {
                this.tab = 1
                this.provinces = this.getDistricts()
                this.showCityTab = false
                this.showAreaTab = false
            },
            resetCity() {
                this.tab = 2
                this.showCityTab = true
                this.showAreaTab = false
                this.getCities()
            },
            chooseProvince(name) {
                this.distpicker.currentProvince = name
                if (this.onlyProvince) return
                this.tab = 2
                this.showCityTab = true
                this.showAreaTab = false
                this.getCities()
            },
            chooseCity(name) {
                this.distpicker.currentCity = name
                if (this.hideArea) return
                this.tab = 3
                this.showCityTab = true
                this.showAreaTab = true
                this.getAreas()
            },
            chooseArea(name) {
                this.distpicker.currentArea = name
            },
            getAreaCode(name, check = '') {
                for (var x in DISTRICTS) {
                    for (var y in DISTRICTS[x]) {
                        if (name == DISTRICTS[x][y]) {
                            if (check.length > 0) {
                                if (y.slice(0, 2) !== this.getAreaCode(check).slice(0, 2)) {
                                    continue
                                } else {
                                    return y
                                }
                            } else {
                                return y
                            }
                        }
                    }
                }
            },
            getCodeValue(code) {
                for (var x in DISTRICTS) {
                    for (var y in DISTRICTS[x]) {
                        if (code == y) {
                            return DISTRICTS[x][y]
                        }
                    }
                }
            },
            getDistricts(code = DEFAULT_CODE) {
                return DISTRICTS[code] || null
            },
            determineValue(currentValue, placeholderValue, check = '') {
                if (!currentValue) {
                    return []
                } else {
                    return this.getDistricts(this.getAreaCode(currentValue, check))
                }
            },
            determineType(value) {
                if (typeof value === 'number') {
                    return this.getCodeValue(value)
                }

                return value
            },
            cleanList(name) {
                this[name] = []
            }
        }
    }
</script>
