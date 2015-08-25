define(['jquery'], function($) { 
	/*! artGallery v1.0.0 | (c) 2015, author: 50048873@qq.com*/
	/* 
		1、必传参数
		datas: 图片及文字资料数据

		2、可选参数
		range: 规则了图片显示的范围
			top: 
				min: 图片距上边的最小值
				max: 图片距上边的最大值
			left: 
				min: 图片距左边的最小值
				max: 图片距左边的最大值
			deg: 
				min: 图片角度的最小值
				max: 图片角度的最大值
		index: 根据传入的数字显示第几张图片，从下标0算起（如果传入不在范围内的数字则随机），默认随机
		auto: 
			true: 根据当前索引自动播放
			false: 不自动播放
		speed: 播放的速度
		mask: 
			true: 所有背景图不可点，并增加蒙版层
			false: 所有背景图可点，并设置为焦点图
		animateShow:
			deal: 类似发牌动画
			disperse：从中间同时分散动画
			pirouette: 原地旋转动画
			redistribute: 重新分配动画
			false: 无动画直接展现
	 */
	var defaults = { 
		range: { 
			top: { 
				min: 0,
				max: $(window).height()
			},
			left: { 
				min: 0,
				max: $(window).width()
			},
			deg: { 
				min: 0,
				max: 360
			}
		},
		index: -1,
		auto: true,
		speed: 2000,
		mask: false,
		animateShow: 'deal'
	};

	function ArtGallery(options, wrap) { 
		this.opts = $.extend({}, defaults, options);
		this.opts.index = (this.opts.index >= 0 && this.opts.index < this.opts.datas.length) ? this.opts.index : Math.floor(Math.random() * this.opts.datas.length);
		this.opts.speed = this.opts.speed < 1000 ? 1000: this.opts.speed;
		this.wrap = $(wrap);
		this.renderDom();
		this.manualSwitchPic();
		if (this.opts.animateShow) { 
			this.animateShow();
		}
		if (this.opts.auto) { 
			this.autoPlay();
		}
	}

	ArtGallery.prototype.renderDom = function() { 
		var datas = this.opts.datas;
		var arr = [], arr1 = [], arr2= [];
		var _this = this;
		for (var i = 0; i < datas.length; i++) { 
			var pos = _this.random();
			if (_this.opts.animateShow === 'deal' || _this.opts.animateShow === 'disperse') { 
				arr1.push(
					['<div class="rahmen center">', 
						'<div class="pages" style="box-shadow: none;">',
							'<div class="page page-front">', 
								'<div class="con">',
									'<img src="img/' + datas[i].img + '" alt="tu" />',
									'<h5>' + datas[i].title + '</h5>',
								'</div>',
							'</div>',
							'<div class="page page-back">',
								'<h5>' + datas[i].title + '</h5>',
								'<p>' + datas[i].des + '</p>',
							'</div>',
						'</div>',
					'</div>'].join('')
				);
			} else { 
				arr1.push(
					['<div class="rahmen ' + (this.opts.index === i ? "center" : "") + '" style="top: ' + pos.top + 'px; left: ' + pos.left + 'px; transform: rotate(' + pos.deg + 'deg)">', 
						'<div class="pages">',
							'<div class="page page-front">', 
								'<div class="con">',
									'<img src="img/' + datas[i].img + '" alt="tu" />',
									'<h5>' + datas[i].title + '</h5>',
								'</div>',
							'</div>',
							'<div class="page page-back">',
								'<h5>' + datas[i].title + '</h5>',
								'<p>' + datas[i].des + '</p>',
							'</div>',
						'</div>',
					'</div>'].join('')
				);
			}
		}
		for (var i = 0; i < datas.length; i++) { 
			this.opts.index === i ? arr2.push('<span class="active active-front"></span>') : arr2.push('<span></span>');
		}
		var mask = (this.opts.mask == true) ? '<div class="mask"></div>' : '';
		arr.push(arr1.join(''), '<div class="nav">' + arr2.join('') + '</div>', mask);
		this.wrap.html(arr);

		this.$btns = this.wrap.find('.nav span');
		this.$rahmens = this.wrap.find('.rahmen');
	};

	ArtGallery.prototype.animateShow = function() { 
		var _this = this;
		var num = Math.floor(this.opts.speed/_this.opts.datas.length);

		if (_this.opts.animateShow === 'deal' || _this.opts.animateShow === 'disperse') { 
			$(document).ready(function() { 
				for (var i = 0; i < _this.opts.datas.length; i++) { 
					var pos = _this.random();
					if (!(_this.opts.index === i)) { 
						$(_this.$rahmens[i]).removeClass('center').css({ 
							top: pos.top,
							left: pos.left,
							transform: 'rotate(' + pos.deg + 'deg)',
							transition: (_this.opts.animateShow === 'deal') ? ('all ' + num + 'ms ease ' + num * i + 'ms') : (_this.opts.animateShow === 'disperse') ? ('all 1s') : '',
						});
					} else { 
						$(_this.$rahmens[i]).css({ 
							top: pos.top,
							left: pos.left,
							transform: 'rotate(' + pos.deg + 'deg)'
						});
					}
				}
			});
		}

		if (_this.opts.animateShow === 'pirouette' || _this.opts.animateShow === 'redistribute') { 
			$(document).ready(function() { 
				var num = 0;
				for (var i = 0; i < _this.opts.datas.length; i++) { 
					var pos = _this.random();
					num += 0.1;
					if (!(_this.opts.index === i)) { 
						$(_this.$rahmens[i]).removeClass('center').css({ 
							top: (_this.opts.animateShow === 'pirouette') ? null : (_this.opts.animateShow === 'redistribute') ? pos.top : '',
							left: (_this.opts.animateShow === 'pirouette') ? null : (_this.opts.animateShow === 'redistribute') ? pos.left : '',
							transform: 'rotate(' + pos.deg + 'deg)'
						});
					}
				}
			});
		}

		if (_this.opts.animateShow === 'deal') { 
			setTimeout(function() { 
				for (var i = 0; i < _this.opts.datas.length; i++) { 
					$(_this.$rahmens[i]).css({ 
						transition: 'all 1s'
					});
				}
				$('.pages').css('box-shadow', '0 0 4px 2px rgba(0, 0, 0, 0.1)');
			}, _this.opts.speed);
		}
	};

	ArtGallery.prototype.random = function() { 
		var range = this.opts.range;
		var pos = { };

		pos.top = Math.floor(Math.random() * (range.top.max - range.top.min) + range.top.min);
		pos.left = Math.floor(Math.random() * (range.left.max - range.left.min) + range.left.min);
		pos.deg = Math.floor(Math.random() * (range.deg.max - range.deg.min) + range.deg.min);

		return pos;
	};

	ArtGallery.prototype.manualSwitchPic = function() { 
		var _this = this;

		this.$btns.click(function() { 
			_this.opts.index = $(this).index();
			_this.showPic(this);
		});

		this.$rahmens.click(function() { 
			_this.opts.index = $(this).index();
			_this.picCenter(this);
		});
	};

	ArtGallery.prototype.showPic = function(currentEle) { 
		var index = this.opts.index;
		var $rahmens = this.$rahmens;
		var $currentPages = $rahmens.eq(index).find('.pages');

		if (currentEle.className === '') { 
			$(currentEle).addClass('active active-front').siblings().removeClass();
			$rahmens.eq(index).addClass('center').siblings().removeClass('center');
			$rahmens.find('.pages').removeClass('switch-backpage');
		} else if (currentEle.className === 'active active-front') { 
			currentEle.className = 'active active-back';
			$currentPages.addClass('switch-backpage');
		} else if (currentEle.className === 'active active-back') { 
			currentEle.className = 'active active-front';
			$currentPages.removeClass('switch-backpage');
		} 
	};

	ArtGallery.prototype.picCenter = function(currentEle) { 
		var index = this.opts.index;
		var $currentbtn = this.$btns.eq(index);

		if (currentEle.className.indexOf('center') != -1) { 
			$(currentEle).find('.pages').toggleClass('switch-backpage');
			$currentbtn.toggleClass('active-front active-back');
		} else { 
			$(currentEle).addClass('center').siblings().removeClass('center').find('.pages').removeClass('switch-backpage');
			$currentbtn.addClass('active active-front').siblings().removeClass('active active-front active-back');
		}
	};

	ArtGallery.prototype.autoPlay = function() { 
		var _this = this;
		var timer;
		this.$btns.add(this.$rahmens).hover(function() { 
			clearInterval(timer);
		}, function() { 
			timer = setInterval(function() { 
				_this.opts.index = (++_this.opts.index === _this.opts.datas.length) ? 0 : _this.opts.index;
				_this.showPic(_this.$btns[_this.opts.index]);
			}, _this.opts.speed);
		}).triggerHandler('mouseleave');
	};

	$.prototype.artGallery = function(options) { 
		return this.each(function(index, ele) { 
			new ArtGallery(options, this);
		});
	};

	return ArtGallery;
});